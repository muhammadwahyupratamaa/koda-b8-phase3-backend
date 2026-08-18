import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const user = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },

    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    avatar_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  },
);

export default user;
