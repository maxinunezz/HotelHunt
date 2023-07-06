const { Hotel, Room } = require("../db");

const getAllHotelsById = async (req, res) => {

  const { id } = req.params;

  try {
    
    const hotels = await Hotel.findAll({ 
      where: {
        userId: id,
      },
    })

    if (!hotels) {
      res.status(400).send('no hay hoteles asociados')
    }

    res.status(200).json(hotels)

  } catch (error) {
    console.error(error);
    res.status(500).send('error del dashboard')
  }
};

const getRoomsByHotel = async(req,res) => {
  const { hotelId } = req.params;

  try {
    const RoomsByHotel = await Room.findAll({where: { hotelId: hotelId }})
    if(!RoomsByHotel){
      throw Error('This Hotel dont have rooms yet.')
    }
    return res.status(200).json(RoomsByHotel);        
  } catch (error) {
    return res.status(500).send(error.message);
    
  }
};

const UpdateRoomsByHotel = async(req,res) => {
  const { hotelId } = req.params;
  const room_for_update = Room.findAll({where: { hotelId: hotelId }});
  room_for_update.update(req.body);
}

const deleteRoomsByHotel = async(req,res) => {//hoteles.. => los cuartos.. el cuarto boton eliminar. que ejecuta deleteroomsbyhotel (hotelid, id habitacion del parametro)

}

const UpdateHotelByUser = async(req, res) => {

}

const deleteHotelByUser = async(req, res) =>{

}

module.exports = {
  getAllHotelsById,
  getRoomsByHotel,
  UpdateRoomsByHotel,
};

//getHotelsById (guardar en array), dentro de ese array de hoteles, un arreglo de rooms que esten relacionados 