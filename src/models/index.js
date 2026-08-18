import link from "./link.js";
import user from "./user.js";

user.hasMany(link, {
  foreignKey: "user_id",
});

link.belongsTo(user, {
  foreignKey: "user_id",
});

export { user, link };
