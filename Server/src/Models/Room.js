const { DataTypes, Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  sequelize.define(
    "Room",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hotelId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      pax: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      services: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      photo: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
    },

    { timestamps: false }
  );
};
