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

const createRoom = async (req, res) => {
    const { name, hotelId, description, pax, services,photo } = req.body;
  
    try {
      await Room.create({
        name,
        hotelId,
        description,
        pax,
        services,
        photo,
      });
  
      return res.status(201).send("Room created successfully");
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
};

const updateRoom = async(req, res) => {
    const { id } = req.params
    try {

        const room = await Room.findByPk(id);
        if(!room) {
            return res.status(404).send("Habitacion no encontrada");
        };

        await room.update(req.body);
        return res.status(200).send("Update successfully");
    } catch (error) {
        return res.status(500).send(error.message); 
    }
};

const deleteRoom = async (req, res) => {
    const roomId = req.params.id
    console.log(roomId);
    try {
        const room = await Room.findOne({
            where: {
                id: roomId,
            }
        });
        if(!room) {
            return res.status(404).send("Habitacion no encontada");
        }
        console.log(room);
        await room.destroy();
        return res.status(200).send('Habitacion eliminada correctamente');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getallRooms,
    createRoom,
    updateRoom,
    deleteRoom,
}