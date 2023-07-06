const { Hotel, conn } = require("../db");



const getAllhotels = async (req, res) => {
  let hotels_array = [];
  try {
    const data = await Hotel.findAll();
    if (data.length === 0) {
      throw Error("No hotels found");
    }

    data.forEach((hotel) => {
      const one_hotel = {
        id: hotel.id,
        userId: hotel.userId,
        name: hotel.name,
        description: hotel.description,
        country: hotel.country,
        city: hotel.city,
        photo: hotel.photo,
        floorNumber: hotel.floorNumber,
        floorNumber: hotel.floorNumber,
        roomsId: hotel.roomsId,
      };
      hotels_array.push(one_hotel);
    });
    return res.status(200).json(hotels_array);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createHotel = async (req, res) => {
  try {
    const { users, name, description, country, city, photo, floorNumber } = req.body;

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
        floorNumber,
        roomsId: [],
      });

      return res.status(201).send("Hotel create successfull");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateHotel = async (req, res) => {
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
};

const deleteHotel = async (req, res) => {
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
};

module.exports = {
  getAllhotels,
  createHotel,
  updateHotel,
  deleteHotel,
};
