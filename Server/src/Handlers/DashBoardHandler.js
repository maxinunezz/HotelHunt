const { Hotel, Room, User } = require("../db");

const getAllHotelsById = async (req, res) => {

  const { id } = userData;

  try {

    const hotels = await Hotel.findAll({
      where: {
        userId: id,
        disabled: false,
      },
    })

    if (!hotels) {
      res.status(404).send('No hay hoteles asociados')
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
      throw Error('Este Hotel aún no tiene habitaciones')
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
      return res.status(404).send("Habitación no encontrada");
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
      return res.status(403).send("No tienes permiso para editar esta sala")
    }

    await room.update(req.body);
    return res.status(200).send("Habitación actualizada");

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
      return res.status(404).send("Habitación no encontrada");
    }
    const hotel = await Hotel.findOne({
      where: {
        id: room.hotelId,
        userId: userData.id,
      }
    });
    if (hotel) {
      
      await room.update({disabled:true})
      await room.destroy();

      return res.status(200).send("Sala eliminada con éxito");
    } else {
      return res.status(403).send("no es tu habitacion");
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
      return res.status(404).send("Habitación no encontrada");
    }
    if (!room.destroyTime) {
      return res.status(400).send("La habitación no se elimina");
    }
    await room.restore();

    return res.status(200).send("Habitación restaurada con éxito");
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
    const { name, description, country, city, photo, hotelCategory, services, } =
      req.body;
    const { id } = userData;

    const hotel = await Hotel.findOne({
      where: {
        name: name
      }
    });
    if (hotel) {
      return res.status(404).send("El hotel ya existe");
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

      return res.status(201).send("Hotel creado exitosamente");
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

      return res.status(201).send("Habitacion creada con éxito");
    } else {
      return res.status(403).send("Solo el dueño puede crear habitaciones")
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
      return res.status(404).send("Hotel no encontrado");
    }
    await hotel.update({disabled: true})
    await hotel.destroy();
    return res.status(200).send("Hotel eliminado con éxito");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const restoreHotel = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const hotel = await Hotel.findByPk(hotelId, { paranoid: false });
    if (!hotel) {
      return res.status(404).send("Hotel no encontrado");
    }
    if (!hotel.destroyTime) {
      return res.status(400).send("El hotel no se elimina");
    }
    await hotel.restore();

    return res.status(200).send("Hotel restaurado con éxito");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = userData;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const destroyUser = await user.destroy();
    await Promise.all([destroyUser]);
    return res.status(200).json({ message: "Tienes 30 días después de que se elimine tu cuenta" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAccount = async (req, res) => {
  const { id } = userData;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await user.update(req.body);

    return res.status(200).json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserInfo = async(req,res) =>{
  const { id } = userData;

  try {
    const userInfo = await findByPk({id: id})
    const mailinfo = await findOne({where: { userId: id }})

    const allInfo = {
      name: userInfo.name ,
      lastName: userInfo.lastName,
      birthDate: userInfo.birthDate,
      phoneNumber: userInfo.phoneNumber, 
      admin: userInfo.admin,
      email: mailinfo.email
    }

    return res.status(200).json(allInfo);
    
  } catch (error) {
    return res.status(500).json(error);
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
  getUserInfo,
  deleteAccount,
  updateAccount,
  restoreRoom,
  restoreHotel
};
