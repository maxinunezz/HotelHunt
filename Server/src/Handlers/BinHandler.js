const { Hotel, Room, User } = require("../db");

const getHotelBin = async (req, res) => {
    const { id } = userData;

    try {
        const hotelsForDelete = await Hotel.findAll({
            where: {
                userId: id,
                paranoid: false,
            }
        })
        if (!hotelsForDelete) {
            return res.status(400).send('There are no hotels to restore')
        } else {
            return res.status(200).json(hotelsForDelete);
        }
    } catch (error) {
        return res.status(500).json(error);

    }
}

const getRoomsBin = async (req, res) => {
    const hotelId = req.params

    try {
        const roomsForDelete = await Room.findAll({
            where: {
                hotelId: hotelId,
                paranoid: false,                
            }
        })
        if(!roomsForDelete){
            return res.status(404).json('There are no hotels to restore')
        }else{
            return res.status(200).json(roomsForDelete)
        }
    } catch (error) {
        return res.status(500).json(error);

    }
}

module.exports = {
    getHotelBin,
    getRoomsBin,
}