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
      checkin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      checkout: {
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
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      paymentStatus: {
        type: DataTypes.ENUM("paid", "unpaid", "outstanding"),
        allowNull: false,
      },
      sessionId: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    { timestamps: false }
  );
};
