const { Hotel,User, Auth, conn } = require("../db");
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




const getAllhotels = async (req, res) => {
  let hotels_array = [];
  try {

    const data = await Hotel.findAll({where: {disabled: false}});
    if (data.length === 0) {
      throw Error("No se encontraron hoteles");
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
      return res.status(404).send("Hotel no encontrado");
    }
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
    Su hotel ${hotel.name} ha sido desactivado por que no cumple con las normas del sitio, por favor editelo.
    Si considera que es un error contactenos a ${COMPANYMAIL}
    </b>
    `,
    });
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
      return res.status(404).send("Hotel no encontrado");
    }
    await hotel.destroy();
    return res.status(200).send("Hotel eliminado con éxito");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllhotels,
  updateHotel,
  deleteHotel,
};
