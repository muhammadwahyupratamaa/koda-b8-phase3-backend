import { constants } from "node:http2";
import linkModel from "../models/link.model.js";

export async function createLink(req, res) {
  try {
    const { original_url, slug } = req.body;
    const reservedSlugs = ["api", "login", "register", "dashboard"];

    if (reservedSlugs.includes(slug.toLowerCase())){
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "this slug is reserved",
      });
    }

    if (!slug) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "slug is required",
      });
    }

    if (slug.length < 3 || slug.length > 50) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Slug must be between 3 and 50 characters",
      });
    }

    if (!/^[a-zA-Z0-9-]+$/.test(slug)) {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        success: false,
        message: "Slug can only contain letters, numbers, and hyphens",
      });
    }

    const newLink = await linkModel.create(req.user.id, original_url, slug);

    return res.status(constants.HTTP_STATUS_CREATED).json({
      success: true,
      message: "Link created successfully",
      data: newLink,
    });
  } catch (error) {
    return res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getMyLinks(req, res) {
  try {
    const links = await linkModel.findByUserId(req.user.id);

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
