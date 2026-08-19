import { Op } from "sequelize";
import link from "./link.js";

async function create(userId, originalUrl, slug, transaction) {
  return link.create(
    {
      user_id: userId,
      original_url: originalUrl,
      slug: slug,
    },
    {
      transaction,
    },
  );
}

async function findByUserId(userId, search) {
  const where = {
    user_id: userId,
    deleted_at: null,
  };

  if (search) {
    where[Op.or] = [
      {
        slug: {
          [Op.iLike]: `%${search}%`,
        },
      },
      {
        original_url: {
          [Op.iLike]: `%${search}%`,
        },
      },
    ];
  }

  return link.findAll({
    where,
  });
}

async function findBySlug(slug) {
  return link.findOne({
    where: {
      slug,
      deleted_at: null,
    },
  });
}

async function findById(id) {
  return link.findOne({
    where: {
      id,
      deleted_at: null,
    },
  });
}

async function softDelete(id) {
  return link.update(
    {
      deleted_at: new Date(),
    },
    {
      where: {
        id,
      },
    },
  );
}

export default {
  create,
  findByUserId,
  findBySlug,
  findById,
  softDelete,
};