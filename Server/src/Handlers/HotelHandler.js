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
        services: hotel.services,
        hotelCategory: hotel.hotelCategory,
        photo: hotel.photo,
        roomsId: hotel.roomsId,
      };
      hotels_array.push(one_hotel);
    });
    return res.status(200).json(hotels_array);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


const updateHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      return res.status(404).send("Hotel not found");
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
      return res.status(404).send("Hotel not found");
    }
    await hotel.destroy();
    return res.status(200).send("Hotel successfully removed");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllhotels,
  updateHotel,
  deleteHotel,
};
