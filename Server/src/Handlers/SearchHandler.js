const { Hotel, conn } = require('../db.js');

const getForSearch = async (req,res) => {
    /* en search se busca hotel por name o region */
    
    const { criterion, value } = req.params

    const query = {
        where: {
          [criterion]: { [Op.iLike]: `%${value}%` },
        },
      };

    try {
        const data = await Hotel.findAll(query);
        if(data.length === 0){
            throw Error("Don't match found");
        }

        const hotels_results = data.map(hotel => ({
            id: hotel.id,
            users: hotel.users,
            name: hotel.name,
            description: hotel.description,
            country: hotel.country,
            city: hotel.city,
            photo: hotel.photo,
            maxCapacity: hotel.maxCapacity,

        }))

        return res.status(200).json(hotels_results);

        
    } catch (error) {
        return res.status(500).send(error.message);        
    }
}

module.exports = {
    getForSearch,
}