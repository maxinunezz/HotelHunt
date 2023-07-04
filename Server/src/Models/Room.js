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
      hotelId: {
        type: DataTypes.UUID,
        reference: {
          model: "Hotel",
          key: "id",
        },
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
    },
    {
      tableName: "Rooms",
    }
  );
};
