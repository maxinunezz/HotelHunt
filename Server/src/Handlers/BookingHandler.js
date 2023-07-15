const Stripe = require('stripe');
const { Booking, Room, User, Auth } = require('../db');
const { Op } = require('sequelize');
const stripe = new Stripe('sk_test_51NTrfKHJDBCJMNrhc1URooDk9yKEJU0TONg60genqgT77WYcIyNQlhGdEa7Gn7pvado3D6WLIbXwDwKlGBitKNF000mPbEiXwv');
const nodemailer = require('nodemailer');

async function createBooking(req, res) {
  try {
    const { userId } = req.body;
    const { roomsToReserve } = req.body;
    

    if (!roomsToReserve || !Array.isArray(roomsToReserve) || roomsToReserve.length === 0) {
      return res.status(400).json({ error: "No rooms to reserve provided" });
    }

    const bookings = [];

    const rooms = await Promise.all(
      roomsToReserve.map(async (room) => {
        const roomDetails = await Room.findByPk(room.roomId);
        return {
          ...room,
          name: roomDetails.name,
          price: roomDetails.price,
        };
      })
    );

    const isRoomAlreadyReserved = async (roomId, checkin, checkout) => {
      const existingBooking = await Booking.findOne({
        where: {
          roomId,
          checkin: {
            [Op.lt]: checkout,
          },
          checkout: {
            [Op.gt]: checkin,
          },
        },
      });

      return existingBooking !== null;
    };



    for (const room of rooms) {
      const { roomId, checkin, checkout, amount, name, price } = room;

      const isReserved = await isRoomAlreadyReserved(roomId, checkin, checkout);
      if (isReserved) {
        return res.status(400).json({ error: `Room with ID ${roomId} is already reserved for the selected dates` });
      }

      const booking = await Booking.create({
        roomId,
        userId,
        checkin,
        checkout,
        paymentStatus: "unpaid",
      });

      bookings.push(booking);
    }

    const calculateDays = (item) => {

      const checkinDate = new Date(item.checkin);
      const checkoutDate = new Date(item.checkout);

      const differenceInMs = checkoutDate.getTime() - checkinDate.getTime();
      const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

      return differenceInDays;
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: rooms.map((room) => ({
        price_data: {
          currency: 'usd',
          unit_amount: room.price * calculateDays(room) * 100,
          product_data: {
            name: room.name,
          },
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    const sessionId = session.id;
    const urlpago = session.url;
    await confirmationEmail(req.body.userId, urlpago, rooms.name, req.body.checkin, req.body.checkout);

    res.status(200).json({ sessionId, urlpago, bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




  

const confirmationEmail = async (userId, urlpago, roomName, checkin, checkout) => {
  try {
    const getUserEmail = async (userId) => {
      const authUser = await Auth.findOne({
        where: { userId },
        attributes: ['email']
      });

      if (authUser) {
        return authUser.email;
      } else {
        throw new Error('Usuario no encontrado');
      }
    };

    const userEmail = await getUserEmail(userId);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hotelhuntservices@gmail.com',
        pass: 'jxovkrctxiokhbwj'
      }
    });

    const mailOptions = {
      from: 'hotelhuntservices@gmail.com',
      to: userEmail,
      subject: 'Confirmación de la reserva',
      text: `¡Gracias por reservar la habitación: 🛏️🛏️ ${roomName}!
      La fecha de entrada es: ${checkin} y la de salida es: ${checkout}
      En caso de no haber realizado el pago haga click en el siguente link: ${urlpago}.
      ¡Gracias por elegir HotelHunt!`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Correo electrónico enviado: ' + info.response);
      }
    });
  } catch (error) {
    console.log('Error en el servidor');
  }
};


const obtenerIdSeccion = async (req, res) => {
    try {
      const sessionId = req.query.sessionId;
      console.log(sessionId)
  
      const session = await stripe.checkout.sessions.retrieve(sessionId);
  
      return res.json(session);
    } catch (error) {
      return res.status(500).send("Error al obtener información de la sesión de pago");
    }
};

module.exports = {
  createBooking,
    obtenerIdSeccion,
    confirmationEmail
};