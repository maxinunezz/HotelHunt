const { Hotel, Room } = require("../db");

const getAllHotelsById = async (req, res) => {

  const { id } = userData;

  try {

    const hotels = await Hotel.findAll({
      where: {
        userId: id,
      },
    })

    if (!hotels) {
      res.status(400).send('no hay hoteles asociados')
    }

    res.status(200).json(hotels)

  } catch (error) {
    console.error(error);
    res.status(500).send('error del dashboard')
  }
};

const getRoomsByHotel = async (req, res) => {
  const { hotelId } = req.params;

  try {
    const RoomsByHotel = await Room.findAll({ where: { hotelId: hotelId } })
    if (!RoomsByHotel) {
      throw Error('This Hotel dont have rooms yet.')
    }
    return res.status(200).json(RoomsByHotel);
  } catch (error) {
    return res.status(500).send(error.message);

  }
};

const UpdateRoomsByHotel = async (req, res) => { //falta testear
  const { hotelId } = req.params;
  const room_for_update = Room.findAll({ where: { hotelId: hotelId } });
  room_for_update.update(req.body);
}

const createRoomByHotel = async (req, res) => {

  const { name, description, pax, services, photo } = req.body;

  const { hotelId } = req.params;
  try {
    const newRoom = await Room.create({
      name,
      hotelId,
      description,
      pax,
      services,
      photo,
    });

    const hotel = await Hotel.findByPk(hotelId);

    const RoomsIds = hotel.roomsId;

    RoomsIds.push(newRoom.id);

    await Hotel.update(
      { roomsId: RoomsIds },
      {
        where: {
          id: hotelId,
        },
      }
    );

    return res.status(201).send("Room created successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }

};

const deleteRoomsByHotel = async (req, res) => {

  try {
    const { roomId } = req.params;
    
    const room = await Room.findOne({
      where: {
        id: roomId,
      },
    });
    if (!room) {
      return res.status(404).send("Habitacion no encontada");
    }
    await room.destroy();
    return res.status(200).send("Habitacion eliminada correctamente");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const UpdateHotelByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      return res.status(404).send("Hotel no encontrado");
    }

    await hotel.update(req.body);
    return res.status(200).json(hotel);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const createHotelByUser = async (req, res) => {
  try {
    const { name, description, country, city, photo } =
      req.body;
    const { id } = userData;

    const existingHotel = await Hotel.findOne({
      where: {
        name: name,
      },
    });

    if (!existingHotel) {
      await Hotel.create({
        userId: id,
        name,
        description,
        country,
        city,
        photo,
        roomsId: [],
      });

      return res.status(201).send("Hotel create successfull");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }

}

const deleteHotelByUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      return res.status(404).send("Habitacion no encontada");
    }
    await hotel.destroy();
    return res.status(200).send("Habitacion eliminada correctamente");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}



module.exports = {
  getAllHotelsById,
  getRoomsByHotel,
  UpdateRoomsByHotel,
  createRoomByHotel,
  deleteRoomsByHotel,
  UpdateHotelByUser,
  deleteHotelByUser,
  createHotelByUser,
};