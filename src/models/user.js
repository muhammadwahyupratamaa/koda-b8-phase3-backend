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
      allowNull: true,
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
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users",
    timestamps: false,

    defaultScope: {
      attributes: {
        exclude: ["password_hash"],
      },
    },

    scopes: {
      withPassword: {
        attributes: {
          include: ["password_hash"],
        },
      },
    },
  },
);

export default user;