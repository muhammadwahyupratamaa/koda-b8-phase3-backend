import { constants } from "node:http2";
import linkModel from "../models/link.model.js";
import sequelize from "../config/database.js";
import redis from "../config/redis.js";

function generateSlug(length = 6) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let slug = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    slug += characters[randomIndex];
  }

  return slug;
}

export async function createLink(req, res) {
  try {
    const { original_url, slug } = req.body;
    const reservedSlugs = ["api", "login", "register", "dashboard"];

    let finalSlug = slug;

    // Auto-generate slug
    if (!finalSlug) {
      do {
        finalSlug = generateSlug();
      } while (await linkModel.findBySlug(finalSlug));
    } else {
      // Custom slug validation
      if (finalSlug.length < 3 || finalSlug.length > 50) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          success: false,
          message: "Slug must be between 3 and 50 characters",
        });
      }

      if (!/^[a-zA-Z0-9-]+$/.test(finalSlug)) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          success: false,
          message: "Slug can only contain letters, numbers, and hyphens",
        });
      }

      if (reservedSlugs.includes(finalSlug.toLowerCase())) {
        return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
          success: false,
          message: "This slug is reserved",
        });
      }
    }

    // Database transaction
    const newLink = await sequelize.transaction(async (transaction) => {
      return linkModel.create(
        req.user.id,
        original_url,
        finalSlug,
        transaction,
      );
    });

    // Clear user links cache after sukses create
    await redis.del(`links:${req.user.id}`);

    return res.status(constants.HTTP_STATUS_CREATED).json({
      success: true,
      message: "Link created successfully",
      data: newLink,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(constants.HTTP_STATUS_CONFLICT).json({
        success: false,
        message: "Slug already exists",
      });
    }

    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getMyLinks(req, res) {
  try {
    const { search } = req.query;

    if (search) {
      const links = await linkModel.findByUserId(req.user.id, search);

      return res.status(constants.HTTP_STATUS_OK).json({
        success: true,
        data: links,
      });
    }

    const cacheKey = `links:${req.user.id}`;

    const cachedLinks = await redis.get(cacheKey);

    if (cachedLinks) {
      return res.status(constants.HTTP_STATUS_OK).json({
        success: true,
        data: JSON.parse(cachedLinks),
      });
    }

    const links = await linkModel.findByUserId(req.user.id);

    await redis.set(cacheKey, JSON.stringify(links));

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      data: links,
    });
  } catch (error) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
}

export async function redirectLinks(req, res) {
  try {
    const { slug } = req.params;
    const link = await linkModel.findBySlug(slug);

    if (!link) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "LINK NOT FOUND",
      });
    }

    return res.redirect(301, link.original_url);
  } catch (error) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
}

export async function deleteLink(req, res) {
  try {
    const { id } = req.params;
    const link = await linkModel.findById(id);

    if (!link) {
      return res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "LINK NOT FOUND",
      });
    }

    if (link.user_id !== req.user.id) {
      return res.status(constants.HTTP_STATUS_FORBIDDEN).json({
        success: false,
        message: "You are not allowed to delete this link",
      });
    }

    await linkModel.softDelete(id);

    await redis.del(`links:${req.user.id}`);

    return res.status(constants.HTTP_STATUS_OK).json({
      success: true,
      message: "Link deleted successfully",
    });
  } catch (error) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
}
