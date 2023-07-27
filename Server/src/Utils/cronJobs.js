const { Op } = require('sequelize');
const { Room, Hotel,User } = require('../db');

const scheduledDeletion = async () => {

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const roomsToDelete = await Room.findAll({
        where: {
          destroyTime: {
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

const delInactiveAcc = async () => {
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);
 
  const accToDelete = await User.findAll({where:
    {
      createdAt:{ 
        [Op.lt]: oneHourAgo 
      },
      disabled: true,
    }  
  })
  for(const user of accToDelete){
    user.destroy({foce:true})
  }
}

module.exports = {
    scheduledDeletion,
    delInactiveAcc,
}