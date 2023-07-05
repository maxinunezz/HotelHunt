const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  /*const hotel = sequelize.models.Hotel;*/
  sequelize.define(
    "Hotel",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      users: {
        type: DataTypes.UUID,
        reference: {
          model: "User",
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
      photo: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      floorNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roomsId: {
        type: DataTypes.JSONB,
        references: {
          model: "Hotel",
          key: "id",
        },
        allowNull: true,
      }
    },
    { timestamps: false }
  );
};
