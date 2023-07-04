const { Room, conn } = require('../db');

const getallRooms = async (req, res) => {
    try {
        const data = await Room.findAll()

        if(data.length === 0 ){
            throw Error("Not rooms found");
        }

        let rooms_array = [];

        data.forEach((room) => {
            const one_room = {
                id: room.id,
                hotelId: room.hotelId,
                description: room.description,
                pax: room.pax,
                services: room.services,
            };
            rooms_array.push(one_room);
        })
        return res.status(200).json(rooms_array);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getallRooms,
}