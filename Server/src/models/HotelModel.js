const { DataTypes } = require('sequelize');

module.exports = (sequelize)=> {
    sequelize.define('Hotel', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => UUIDV4(),
            allowNull: true,
        },
        users: {
            type: DataTypes.UUID,
            reference: {
                moodel:"Users",
                key: "id"
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
        location: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        photo: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        maxCapacity: {
            type: DataTypes.SMALLINT,
            allowNull: false  
        },
    },
    {timestamps: false}
    )
}