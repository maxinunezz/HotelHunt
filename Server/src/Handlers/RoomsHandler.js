const { Room, Hotel, conn } = require("../db");

const getAllRooms = async (req, res) => {
  try {
    const data = await Room.findAll({where:{
      disabled: false,
    }});

    if (data.length === 0) {
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
        price: room.price,
      };
      rooms_array.push(one_room);
    });
    return res.status(200).json(rooms_array);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


const updateRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).send("Room not found");
    }

    await room.update(req.body);
    return res.status(200).send("Update successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteRoom = async (req, res) => {
  const roomId = req.params.id;
  try {
    const room = await Room.findOne({
      where: {
        id: roomId,
      },
    });
    if (!room) {
      return res.status(404).send("Room not found");
    }


    const hotel = await Hotel.findOne({ where: { id: room.hotelId } })
    const newRoomsId = hotel.roomsId.filter((roomId) => roomId !== room.id);

    const poproom = await hotel.update({ roomsId: newRoomsId });
    const destroyroom = await room.destroy();

    await Promise.all([poproom, destroyroom])

    return res.status(200).send("Room deleted successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllRooms,
  updateRoom,
  deleteRoom,
};
