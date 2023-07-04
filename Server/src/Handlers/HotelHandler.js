const { Hotel, conn } = require('../db');

let hotels_array = [];

const getallhotels = async (req, res) => {
    try {
        const data = await Hotel.findAll();
        if (data.length === 0) {
            throw Error('No hotels found');
        }

        data.foreach((hotel) => {
            const one_hotel = {
                id: hotel.id,
                users: hotel.users,
                name: hotel.name,
                description: hotel.description,
                location: {
                    latitude: hotel.location[0],
                    longitude: hotel.location[1],
                },
                photo: hotel.photo,
                maxCapacity: hotel.maxCapacity,
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
        const { id, name, description, location, photo, maxCapacity } = req.body;

        const existingHotel = await Hotel.findOne({
            where: {
                name: name,
            }
        })

        if (!existingHotel) {
            await Hotel.create({
                users: id,
                name,
                description,
                location,
                photo,
                maxCapacity,
            });

            return res.status(201).send("Hotel create successfull");
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = {
    getallhotels,
    createHotel,
}