const { Hotel, conn } = require("../db.js");
const { Op } = require('sequelize');

const getForSearch = async (req, res) => {

  const { criterion, value } = req.body; 


	const query = {
		where: {
			[criterion]: { [Op.iLike]: `%${value}%` },
		},
	};

	try {
		const data = await Hotel.findAll(query);
		if (data.length === 0) {
			throw Error("No coincide");
		}

    const hotels_results = data.map((hotel) => ({
      id: hotel.id,
      userId: hotel.userId,
      name: hotel.name,
      description: hotel.description,
      country: hotel.country,
      city: hotel.city,
      photo: hotel.photo,
      services: hotel.services,
      hotelCategory: hotel.hotelCategory
    }));


		return res.status(200).json(hotels_results);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

module.exports = {
	getForSearch,
};
