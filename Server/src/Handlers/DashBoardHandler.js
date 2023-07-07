const axios = require('axios');
const { User, Hotel, roomsId } = require('../db');

const dashBoardHandler = async (req, res) => {
	const { id } = req.params;

	try {
		const hotels = await Hotel.findAll({
			where: {
				users: id,
			},
			inlcude: [roomsId],
		});

		if (!hotels) {
			res.status(400).send('no hay hoteles asociados');
		}

		res.status(200).json(hotels);
	} catch (error) {
		console.error(error);
		res.status(500).send('error del dashboard');
	}
};

module.exports = { dashBoardHandler };

//getHotelsById (guardar en array), dentro de ese array de hoteles, un arreglo de rooms que esten relacionados
