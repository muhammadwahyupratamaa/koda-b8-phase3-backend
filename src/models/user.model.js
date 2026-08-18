import user from "./user.js";

async function findByEmail(email) {
  return user.findOne({
    where: {
      email,
    },
  });
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
