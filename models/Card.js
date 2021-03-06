// created by - Dyravuth Yorn
// Import Dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// Instnatiate the cards
class Card extends Model {}

Card.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    api_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_img: {
      type: DataTypes.STRING,
      validate: { isURL: true },
    },
    card_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "card",
  }
);

module.exports = Card;
