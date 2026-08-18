import link from "./link.js";

async function create(userId, originalUrl, slug) {
  return link.create({
    user_id: userId,
    original_url: originalUrl,
    slug: slug,
  });
}

export default {
  create,
};
