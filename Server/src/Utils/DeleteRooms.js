const { Op } = require('sequelize');
const { Room, Hotel, conn } = require('../db');

const scheduledDeletion = async () => {

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const roomsToDelete = await Room.findAll({
        where: {
          deletedAt: {
            [Op.lt]: thirtyDaysAgo
          }
        }
    });

    for (const room of roomsToDelete) {
        const hotel = await Hotel.findByPk(room.hotelId);
      
        const newRoomsId = hotel.roomsId.filter((roomId) => roomId !== room.id);
        await hotel.update({ roomsId: newRoomsId });
    }      
}

module.exports = {
    scheduledDeletion,
}