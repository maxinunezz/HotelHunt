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
    const data = await Hotel.findAll({ where: { disabled: false } });
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
      subject: "Hotel desactivado",
      html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
            }
      
            .container {
              text-align: center;
              max-width: 700px;
              padding: 20px;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
      
            img {
              max-width: 50%;
              height: auto;
              border-radius: 5px;
              margin-bottom: 10px;
              background-color: none;
            }
      
            h1 {
              color: #010101;
              margin-bottom: 10px;
            }
      
            h4 {
              color: #767575;
            }
      
            button {
              background-color: #0066cc;
              color: #fff;
              padding: 10px 20px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              margin-top: 20px;
            }
          </style>
         </head>
         <body>
           <div class="container">
             <div>
               <img src="https://cdn.discordapp.com/attachments/1125503406371524661/1127923542743334912/image.png" alt="" />
             </div>
       
             <h2>
              Su hotel ${hotel.name} ha sido desactivado por que no cumple con las normas del sitio, por favor editelo.
             </h2>
       
             <div >
               <p>
                Si considera que es un error contactenos a ${COMPANYMAIL}
                <br>
                <div>
             </div>
             <br>
              </p>
                 
               
             </div>
             
           </div>
         </body>
       </html>
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

const getHotelsAdmin = async (req, res) => {
  let hotels_array = [];
  try {

    const data = await Hotel.findAll();
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
        disabled: hotel.disabled,
      };
      hotels_array.push(one_hotel);
    });
    return res.status(200).json(hotels_array);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllhotels,
  updateHotel,
  deleteHotel,
  getHotelsAdmin,
};
