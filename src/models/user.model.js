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

async function create(name, email, passwordHash) {
  return user.create({
    name,
    email,
    password_hash: passwordHash,
  });
}

export default {
  findByEmail,
  create,
};