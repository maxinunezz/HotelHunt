const { DataTypes, Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  const Hotel = sequelize.models.Hotel;
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
        references: {
          model: Hotel,
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
      price: {
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
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
       hotelCategory: {
        type: DataTypes.STRING,
        allowNull: true,
        
      }
      
    },
    { 
      paranoid: true,
      deletedAt: 'destroyTime',
      deletedRetention: 31,
     }
  );
};
