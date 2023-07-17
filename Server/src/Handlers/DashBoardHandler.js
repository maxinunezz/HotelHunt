const { Hotel, Room, User } = require("../db");

const getAllHotelsById = async (req, res) => {

  const { id } = userData;

  try {

    const hotels = await Hotel.findAll({
      where: {
        userId: id,
      },
    })

    if (!hotels) {
      res.status(404).send('There are no associated hotels')
    }

    res.status(200).json(hotels)

  } catch (error) {
    console.error(error);
    res.status(500).send('Dashboard error')
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

const UpdateRoomsByHotel = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findOne({
      where: {
        id: roomId,
      },
    });

    if (!room) {
      return res.status(404).send("Room not found");
    }
    

    let tuhotel;

    if (room) {
      tuhotel = await Hotel.findOne({
        where: {
          id: room.hotelId,
          userId: userData.id,
        }
      });
    }

    if (!tuhotel) {
      return res.status(403).send("You don't have permission to edit this room")
    }

    await room.update(req.body);
    return res.status(200).send("Room updated");

  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const deleteRoomsByHotel = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findOne({
      where: {
        id: roomId,
      },
    });
    if (!room) {
      return res.status(404).send("Room not found");
    }
    const hotel = await Hotel.findOne({
      where: {
        id: room.hotelId,
        userId: userData.id,
      }
    });
    if (hotel) {
      await room.update({disabled: true});
      await room.destroy();

      return res.status(200).send("Room deleted successfully");
    } else {
      return res.status(403).send("Is not your room");
    }

  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const restoreRoom = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findByPk(roomId, { paranoid: false });
    if (!room) {
      return res.status(404).send("Room not found");
    }
    if (!room.destroyTime) {
      return res.status(400).send("Room is not deleted");
    }
    await room.restore();

    return res.status(200).send("Room restored successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const UpdateHotelByUser = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const hotel = await Hotel.findOne({
      where: {
        id: hotelId,
        userId: userData.id
      }
    });
    if (!hotel) {
      return res.status(404).send("Hotel not found");
    }

    await hotel.update(req.body);
    return res.status(200).json(hotel);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const createHotelByUser = async (req, res) => {
  try {
    const { name, description, country, city, photo, hotelCategory, services, } =
      req.body;
    const { id } = userData;

    const hotel = await Hotel.findOne({
      where: {
        name: name
      }
    });
    if (hotel) {
      return res.status(404).send("Hotel already exist");
    }

    const photosArray = []
    photosArray.push(photo);

    if (!hotel) {
      await Hotel.create({
        userId: id,
        name,
        description,
        country,
        city,
        photo: photosArray,
        services,
        hotelCategory,
        roomsId: [],
      });

      return res.status(201).send("Hotel create successfull");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }

}

const createRoomByHotel = async (req, res) => {

  const { name, description, pax, services, photo, price, floorNumber } = req.body;

  const { hotelId } = req.params;
  try {
    const hotel = await Hotel.findOne({
      where: {
        id: hotelId,
        userId: userData.id,
      }
    });
    if (hotel) {
      const newRoom = await Room.create({
        name,
        hotelId,
        description,
        pax,
        services,
        price,
        photo,
        floorNumber,
        hotelCategory:hotel.hotelCategory
      });

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
    } else {
      return res.status(403).send("Only owner can create rooms")
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }

}

const deleteHotelByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findOne({
      where: {
        id: id, 
        userId: userData.id,
      }
    });
    if (!hotel) {
      return res.status(404).send("Hotel not found");
    }
    await hotel.update({disabled: true});
    await hotel.destroy();
    return res.status(200).send("Hotel successfully removed");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const restoreHotel = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const hotel = await Hotel.findByPk(hotelId, { paranoid: false });
    if (!hotel) {
      return res.status(404).send("Hotel not found");
    }
    if (!hotel.destroyTime) {
      return res.status(400).send("Hotel is not deleted");
    }
    await hotel.restore();

    return res.status(200).send("Hotel restored successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = userData;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const destroyUser = await user.destroy();
    await Promise.all([destroyUser]);
    return res.status(200).json({ message: "You have 30 days after your account would delete" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAccount = async (req, res) => {
  const { id } = userData;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update(req.body);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getAllHotelsById,
  getRoomsByHotel,
  UpdateRoomsByHotel,
  createRoomByHotel,
  deleteRoomsByHotel,
  UpdateHotelByUser,
  deleteHotelByUser,
  createHotelByUser,
  deleteAccount,
  updateAccount,
  restoreRoom,
  restoreHotel
};

