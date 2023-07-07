const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  const User = sequelize.models.User
  const Room = sequelize.models.Room
  sequelize.define(
    "Hotel",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: User,
          key: "id",
        },
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      services: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      hotelcategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      roomsId: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
