const { Hotel, Room, User } = require("../db");

const getHotelBin = async (req, res) => {
    const { id } = userData;

    try {
        const hotelsForDelete = await Hotel.findAll({
            where: {
                userId: id,
                paranoid: false,
            }
        })
        if (!hotelsForDelete) {
            return res.status(400).send('No hay hoteles para restaurar')
        } else {
            return res.status(200).json(hotelsForDelete);
        }
    } catch (error) {
        return res.status(500).json(error);

    }
}

const getRoomsBin = async (req, res) => {
    const { id } = userData;

    try {
        const hotels = await Hotel.findAll({ where: { userId: id } })
        let arrayRoom = [];

        for (const hotel of hotels) {
            const roomsForDelete = await Room.findAll({
                where: {
                    hotelId: hotel.id,
                },
                paranoid: false,
            })
            for(const room of roomsForDelete){
                const one_room = {
                    id: room.id,
                    name: room.name,
                    photo: room.photo,
                    pax: room.pax

                }
                arrayRoom.push(one_room);
            }
            
        }
        if (!arrayRoom) {
            return res.status(404).json('No hay hoteles para restaurar')
        } else {
            return res.status(200).json(arrayRoom)
        }
    } catch (error) {
        return res.status(500).json(error);

    }
}

module.exports = {
    getHotelBin,
    getRoomsBin,
}