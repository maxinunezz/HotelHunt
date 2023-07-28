const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  sequelize.define(
    "Rating",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        reference: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      hotelId: {
        type: DataTypes.UUID,
        reference: {
          model: "Hotels",
          key: "id",
        },
        allowNull: false,
      }
    },
    { timestamps: false }
  );
};
