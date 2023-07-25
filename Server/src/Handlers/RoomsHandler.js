const { Room, Hotel,User, Auth, conn } = require("../db");
const nodemailer = require("nodemailer");
require("dotenv").config();

const { PASSMAIL, COMPANYMAIL } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: COMPANYMAIL,
    pass: PASSMAIL,
  },
});

const getAllRooms = async (req, res) => {
  try {
    const data = await Room.findAll(
      {
        where:{
      disabled: false,
    },
 
  });

    if (data.length === 0) {
      throw Error("No se encontraron habitaciones");
    }

    let rooms_array = [];

    data.forEach((room) => {
      const one_room = {
        id: room.id,
        name: room.name,
        hotelId: room.hotelId,
        description: room.description,
        pax: room.pax,
        photo: room.photo,
        services: room.services,
        price: room.price,
        floorNumber: room.floorNumber,
        disabled: room.disabled,
        hotelCategory: room.hotelCategory
      };
      rooms_array.push(one_room);
    });
    return res.status(200).json(rooms_array);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


const updateRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).send("Habitación no encontrada");
    }

    await room.update(req.body);
    const hotel = await Hotel.findByPk(room.hotelId)
    const user = await User.findByPk(hotel.userId)
    const auth = await Auth.findOne({where: { userId: user.id }})
    const email = auth.email;
		await hotel.update(req.body);
    await transporter.sendMail({
      from: `"Hotel Hunt"  <${COMPANYMAIL}>`,
      to: email,
      subject: "CONFIRM YOUR ACCOUNT",
      html: `
    <b>
    Su Habitacion ${room.name} ha sido desactivado por que no cumple con las normas del sitio, por favor editelo.
    Si considera que es un error contactenos a ${COMPANYMAIL}
    </b>
    `,
    });



    return res.status(200).send("Habitacion actualizada correctamente");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deleteRoom = async (req, res) => {
  const roomId = req.params.id;
  try {
    const room = await Room.findOne({
      where: {
        id: roomId,
      },
    });
    if (!room) {
      return res.status(404).send("Habitacion no encontrada");
    }


    const hotel = await Hotel.findOne({ where: { id: room.hotelId } })
    const newRoomsId = hotel.roomsId.filter((roomId) => roomId !== room.id);

    const poproom = await hotel.update({ roomsId: newRoomsId });
    await room.update({disabled: true});
    const destroyroom = await room.destroy();

    await Promise.all([poproom, destroyroom])

    return res.status(200).send("Habitacion eliminada con éxito");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllRooms,
  updateRoom,
  deleteRoom,
};
