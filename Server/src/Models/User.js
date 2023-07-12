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
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.STRING,
        defaultValue: "normal",
        allowNull: false,
      },
      disabled:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { paranoid: true,
      deletedAt: 'destroyTime',
      deletedRetention: 30
    }
  );
};

