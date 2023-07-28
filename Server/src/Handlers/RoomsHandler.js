const { Room, Hotel, User, Auth, conn } = require("../db");
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
        where: {
          disabled: false,
        },

      });

    if (data.length === 0) {
      throw Error("No se encontraron habitaciones");
    }

    let rooms_array = [];

    for (const room of data) {
      const hotel = await Hotel.findByPk(room.hotelId);
      if (hotel) {
        const one_room = {
          id: room.id,
          name: room.name,
          hotelId: room.hotelId,
          hotelName: hotel.name,
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
      };
    }
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
    const auth = await Auth.findOne({ where: { userId: user.id } })
    const email = auth.email;
    await hotel.update(req.body);
    await transporter.sendMail({
      from: `"Hotel Hunt"  <${COMPANYMAIL}>`,
      to: email,
      subject: "Habitación desactivada",
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
                Su Habitacion ${room.name} ha sido desactivado por que no cumple con las normas del sitio, por favor editelo
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
    await room.update({ disabled: true });
    const destroyroom = await room.destroy({ force: true });

    await Promise.all([poproom, destroyroom])

    return res.status(200).send("Habitacion eliminada con éxito");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getRoomsByAdmin= async (req, res) => {
  try {
    const data = await Room.findAll();

    if (data.length === 0) {
      throw Error("No se encontraron habitaciones");
    }

    let rooms_array = [];

    for (const room of data) {
      const hotel = await Hotel.findByPk(room.hotelId);
      if (hotel) {
        const one_room = {
          id: room.id,
          name: room.name,
          hotelId: room.hotelId,
          hotelName: hotel.name,
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
      };
    }
    return res.status(200).json(rooms_array);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllRooms,
  updateRoom,
  deleteRoom,
  getRoomsByAdmin,
};
