import link from "./link.js";

async function create(userId, originalUrl, slug) {
  return link.create({
    user_id: userId,
    original_url: originalUrl,
    slug: slug,
  });
}

async function findByUserId(userId) {
  return link.findAll({
    where: {
      user_id: userId,
      deleted_at: null,
    },
  });
}

async function findBySlug(slug) {
  return link.findOne({
    where: {
      slug: slug,
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
