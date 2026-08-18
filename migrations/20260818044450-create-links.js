import { DataTypes } from "sequelize";

export async function up(queryInterface) {
  await queryInterface.createTable("links", {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    original_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  await queryInterface.sequelize.query(`
    CREATE UNIQUE INDEX idx_links_slug
    ON links(slug)
    WHERE deleted_at IS NULL;
  `);
}

export async function down(queryInterface) {
  await queryInterface.dropTable("links");
}