const { Hotel, conn } = require('../db');
const { v4: uuidv4 } = require("uuid");

let hotels_array = [];

const getallhotels = async (req,res) => {
    try {
        const data = await Hotel.findAll();
        if(data.length === 0){
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
      const { name, description, location, photo, maxCapacity } = req.body;

      const users = uuidv4();
  
      const hotel = await Hotel.create({
        users,
        name,
        description,
        location,
        photo,
        maxCapacity,
      });
  
      return res.status(201).json(hotel);
    } catch (error) {
      console.error("Error al crear el hotel:", error);
      return res.status(500).json({ error: "Error al crear el hotel" });
    }
  };

module.exports = {
    getallhotels,
    createHotel,
}