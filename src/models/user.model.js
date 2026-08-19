import user from "./user.js";

async function findByEmail(email, options = {}) {
  const query = {
    where: {
      email,
    },
  };

  if (options.withPassword) {
    return user.scope("withPassword").findOne(query);
  }

  return user.findOne(query);
}

async function create( email, passwordHash) {
  return user.create({
    email,
    password_hash: passwordHash,
  });
}

export default {
  findByEmail,
  create,
};