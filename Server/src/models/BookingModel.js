const { DataTypes } = require('sequelize');

module.exports = (sequelize)=> {
    sequelize.define('Booking', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => UUIDV4(),
            allowNull: true,
        },
        dateStart: {
            tpye: DataTypes.DATE,
            allowNull: false

        },
        dataEnd: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        roomId: {
            type: DataTypes.UUID,
            reference: {
                model: "Room",
                key: "id"
            },
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            reference: {
                moodel: "Users",
                key: "id"
            },
            allowNull: false,
        },
    },
    {timestamps: false}
    )
}