const { DataTypes, Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");


module.exports = (sequelize) => {
  const User = sequelize.models.User
  sequelize.define(
    "Auth",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull:false,
        references: {
          model: User,
          key: "id",
        }
      }
    },
    { 
      paranoid: true,
      deletedAt: 'destroyTime',
      deletedRetention: 30,
     }
  );
};
