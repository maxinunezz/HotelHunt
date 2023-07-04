const {Room, conn} = require("../db")

const createRoom = async (req, res) => {
    const { hotelId, description, pax, services } = req.body;
  
    try {
      const newRoom = await Room.create({
        hotelId,
        description,
        pax,
        services,
      });
  
      return res.status(201).json(newRoom);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al crear la habitación' });
    }
};

const getRoombyId = async (req, res) => {
    const { roomId } = req.params;
    try {
        const room = await Room.findByPK(roomId);
        if(!room) {
            return res.status(404).send('Habitacion no encontrada');
        }
        return res.status(200).json(room);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const getAllRooms = async () => {
    try {
        const rooms = await Room.findAll();
        return rooms;
    } catch (error) {
        throw new Error('Error al obtener las habitaciones')
    }
};

const updateRoom = async(req, res) => {
    const { roomId } = req.params
    try {

        const room = Room.findByPK(roomId)
        if(!room) {
            return res.status(404).send("Habitacion no encontrada");
        };

        await room.update(req.body);
        return res.status(200).json(room);
    } catch (error) {
        return res.status(500).send(error.message); 
    }
};

const deleteRoom = async (req, res) => {
    const { roomId } = req.params;
    try {
        const room = await Room.findByPK(roomId);
        if(!room) {
            return res.status(404).send("Habitacion no encontada");
        }
        await room.destroy();
        return res.status(200).send('Habitacion eliminada correctamente');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


module.exports = {
    createRoom,
    getRoombyId,
    getAllRooms,
    updateRoom,
    deleteRoom,
}