const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => { 
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admin: {
        type: DataTypes.STRING,
        defaultValue: "normal",
        allowNull: false,
      },
      disabled:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      google_id:{
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
      },
      favoriteHotel:{
        type: DataTypes.JSONB,
        defaultValue:[],
        allowNull: true
      }
    },
    { paranoid: true,
      deletedAt: 'destroyTime',
      deletedRetention: 30
    }
  );
};

