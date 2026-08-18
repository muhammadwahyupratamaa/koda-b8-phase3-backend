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

export default {
  create,
  findByUserId,
};