const { Room, Hotel, conn } = require('../db.js');

const getForSearch = async (req,res) => {
    
    const { criterion, value } = req.params

    const query = {
        where: {
          [criterion]: { [Op.iLike]: `%${value}%` },
        },
      };

    try {
        const data = await Room.findAll(query);
        if(data.length === 0){
            throw Error("Don't match found");
        }

        const rooms_results = data.map(room => ({
            id: room.id,
            hotelId: room.hotelId,
            description: room.description,
            pax: room.pax,
            services: room.services,

        }))

        return res.status(200).json(rooms_results);

        
    } catch (error) {
        return res.status(500).send(error.message);        
    }
}

module.exports = {
    getForSearch,
}