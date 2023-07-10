const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  sequelize.define(
    "Booking",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      dateStart: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dataEnd: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      roomId: {
        type: DataTypes.UUID,
        reference: {
          model: "Room",
          key: "id",
        },
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        reference: {
          moodel: "Users",
          key: "id",
        },
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
