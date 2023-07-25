const { Hotel, Room, User, Booking, Auth, Rating } = require("../db");

const getAllHotelsById = async (req, res) => {
  const { id } = userData;

  try {
    const hotels = await Hotel.findAll({
      where: {
        userId: id,
      },
    });

    if (!hotels) {
      res.status(404).send("No hay hoteles asociados");
    }

    res.status(200).json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).send("Dashboard error");
  }
};

const getRoomsByHotel = async (req, res) => {
  const { hotelId } = req.params;

  try {
    const RoomsByHotel = await Room.findAll({ where: { hotelId: hotelId } });
    if (!RoomsByHotel) {
      throw Error("Este Hotel aún no tiene habitaciones");
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
        },
      });
    }

    if (!tuhotel) {
      return res.status(403).send("No tienes permiso para editar esta sala");
    }

    await room.update(req.body);
    return res.status(200).send("Habitación actualizada");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

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
      },
    });
    if (hotel) {
      await room.update({ disabled: true });
      await room.destroy();

      return res.status(200).send("Sala eliminada con éxito");
    } else {
      return res.status(403).send("no es tu habitacion");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const restoreRoom = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findByPk(roomId, { paranoid: false });
    if (!room) {
      return res.status(404).send("Habitación no encontrada");
    }
    if (!room.deletedAt) {
      return res.status(400).send("La habitación ya está restaurada");
    }
    let turoom;
    if (room) {
      turoom = await Hotel.findOne({
        where: {
          id: room.hotelId,
          userId: userData.id,
        },
      });
    }

    if (!turoom) {
      return res.status(403).send("No tienes permiso para restaurar esta sala");
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
        userId: userData.id,
      },
    });
    if (!hotel) {
      return res.status(404).send("Hotel no encontrado");
    }

    await hotel.update(req.body);
    return res.status(200).json("Hotel actualizado");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createHotelByUser = async (req, res) => {
  try {
    const { name, description, country, city, photo, hotelCategory, services } =
      req.body;
    const { id } = userData;

    const hotel = await Hotel.findOne({
      where: {
        name: name,
      },
    });
    if (hotel) {
      return res.status(404).send("El hotel ya existe");
    }

    const photosArray = [];
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
};

const createRoomByHotel = async (req, res) => {
  const { name, description, pax, services, photo, price, floorNumber } =
    req.body;

  const { hotelId } = req.params;
  try {
    const hotel = await Hotel.findOne({
      where: {
        id: hotelId,
        userId: userData.id,
      },
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
        hotelCategory: hotel.hotelCategory,
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
      return res.status(403).send("Solo el dueño puede crear habitaciones");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteHotelByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findOne({
      where: {
        id: id,
        userId: userData.id,
      },
    });
    if (!hotel) {
      return res.status(404).send("Hotel no encontrado");
    }
    await hotel.update({ disabled: true });
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
    if (!hotel.deletedAt) {
      return res.status(400).send("El hotel ya está restaurado");
    }
    if (hotel.userId !== userData.id) {
      return res
        .status(403)
        .send("No tienes permiso para restaurar este hotel");
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
    return res
      .status(200)
      .json({ message: "Tienes 30 días después de que se elimine tu cuenta" });
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

const getUserInfo = async (req, res) => {
  const { id } = userData;

  try {
    const userInfo = await findByPk({ id: id });
    const mailinfo = await findOne({ where: { userId: id } });

    const allInfo = {
      name: userInfo.name,
      lastName: userInfo.lastName,
      birthDate: userInfo.birthDate,
      phoneNumber: userInfo.phoneNumber,
      admin: userInfo.admin,
      email: mailinfo.email,
    };

    return res.status(200).json(allInfo);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllBooking = async (req, res) => {
  const { id } = userData;
  let reservas = [];

  try {
    const hotels = await Hotel.findAll({
      where: {
        userId: id,
      },
    });
    console.log(hotels);
    if (!hotels) {
      return res.status(404).send("Aun no has registrado un hotel");
    }

    for (const hotel of hotels) {
      const booking = await Booking.findAll({
        where: {
          hotelId: hotel.id,
        },
      });

      for (const reserve of booking) {
        let room = [];
        room = await Room.findByPk(reserve.roomId);
        if (room.length === 0) {
          return res.status(404).send("Aun no tienes habitaciones");
        }
        const user = await Auth.findOne({ where: { userId: id } });
        const one_reserve = {
          checkin: reserve.checkin,
          checkout: reserve.checkout,
          price: reserve.price,
          roomName: room.name,
          hotelName: hotel.name,
          paymentStatus: reserve.paymentStatus,
          userEmail: user.email,
        };
        reservas.push(one_reserve);
      }
    }
    if (reservas.length > 0) {
      return res.status(200).json(reservas);
    } else {
      return res.status(404).send("Aun no tienes reservas");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllRating = async (req, res) => {
  const { id } = userData;
  let comentario = [];
  try {
    const hotels = await Hotel.findAll({
      where: {
        userId: id,
      },
    });
    if (!hotels) {
      return res.status(404).send("No exsiste el hotel");
    }
    for (const hotel of hotels) {
      const ratings = await Rating.findAll({
        where: {
          hotelId: hotel.id,
        },
      });
      if (!ratings) {
        return res.status(404).send("No exsisten comentario");
      }
      for (const rating of ratings) {
        const one_reserve = {
          score: rating.score,
          coments: rating.comment,
          hotel: hotel.name,
        };
        comentario.push(one_reserve);
      }
    }
    if (comentario.length > 0) {
      return res.status(200).json(comentario);
    } else {
      return res.status(404).send("No existen comentarios");
    }
  } catch (error) {
    return res.status(500).json(error);
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
  getUserInfo,
  deleteAccount,
  updateAccount,
  restoreRoom,
  restoreHotel,
  getAllBooking,
  getAllRating,
};
