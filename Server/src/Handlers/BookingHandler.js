require('dotenv').config();
const { Booking, Room, User, Auth } = require('../db');
const { Op } = require('sequelize');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

async function createBooking(req, res) {
  try {
    //const { id } = userData;
    const {userId, roomsToReserve } = req.body;

    if (!roomsToReserve || !Array.isArray(roomsToReserve) || roomsToReserve.length === 0) {
      return res.status(400).json({ error: "No rooms to reserve provided" });
    }

    const bookings = [];

    const getRoomDetails = async (roomId) => {
      const roomDetails = await Room.findByPk(roomId);
      if (roomDetails) {
        return {
          name: roomDetails.name,
          price: roomDetails.price,
        };
      } else {
        throw new Error(`Room with ID ${roomId} not found`);
      }
    };
    

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

    const calculateStayDuration = (checkin, checkout) => {
      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);

      const differenceInMs = checkoutDate.getTime() - checkinDate.getTime();
      const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

      return differenceInDays;
    };

    const rooms = await Promise.all(
      roomsToReserve.map(async (room) => {
        const roomDetails = await getRoomDetails(room.roomId);
        return {
          ...room,
          ...roomDetails,
        };
      })
    );

    for (const room of rooms) {
      const { roomId, checkin, checkout, amount, name, price } = room;

      const isReserved = await isRoomAlreadyReserved(roomId, checkin, checkout);
      if (!isReserved) {
        const booking = await Booking.create({
          roomId,
          userId,
          checkin,
          checkout,
          paymentStatus: "unpaid",
        });

        bookings.push(booking);
      } else {
        return res
          .status(400)
          .json({ error: `Room with ID ${roomId} is already reserved for the selected dates` });
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: rooms.map((room) => ({
        price_data: {
          currency: 'usd',
          unit_amount: room.price * calculateStayDuration(room.checkin, room.checkout) * 100,
          product_data: {
            name: room.name,
          },
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `http://localhost:5173/`,
      cancel_url: `http://localhost:5173/`,
    });

    //const user = await User.findByPk(id);
    const sessionId = session.id;
    const urlpago = session.url;
    //await confirmationEmail(id, urlpago, user.name);
    updateBookingPaymentStatus(sessionId, bookings);

    res.status(200).json({ sessionId, urlpago, bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBookingPaymentStatus = async (sessionId, bookings) => {
  // Obtener la sesión de pago desde Stripe
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === 'paid') {
    // Actualizar el estado de pago en tu base de datos
    for (const booking of bookings) {
      await Booking.update(
        { paymentStatus: 'paid' },
        { where: { id: booking.id } }
      );
    }


    // Opcionalmente, enviar un correo electrónico de confirmación o realizar otras acciones
    // ...

    console.log('Pago actualizado correctamente');
  } else {
    console.log('La sesión de pago no ha sido pagada todavía');
  }
};



const confirmationEmail = async (id, urlpago, name) => {
  try {
    const getUserEmail = async (id) => {
      const authUser = await Auth.findOne({
        where: { userId: id }
      });

      if (authUser) {
        return authUser.email;
      } else {
        throw new Error('Usuario no encontrado');
      }
    };

    const userEmail = await getUserEmail(id);
    const { PASSMAIL, COMPANYMAIL } = process.env;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: COMPANYMAIL,
        pass: PASSMAIL,
      }
    });
    console.log(userEmail)

    await transporter.sendMail({
      from: `"Hotel Hunt"  <${COMPANYMAIL}>`, 
      to: userEmail, 
      subject: 'Confirmación de la reserva', 
      html: 
      `¡Gracias ${name} por reservar con nosotros!
      En tu perfil, de nuestra página, puedes ver los detalles de la/s reserva/s.
      En caso de no haber realizado el pago haga click en el siguente link: ${urlpago}
      Recuerda realizar el pago en las proximas 24 horas o la reserva será dada de baja.
      ¡Gracias por elegir HotelHunt!`, 
    });

  } catch (error) {
    console.log('Error en el servidor');
  }
};


const obtenerIdSeccion = async (req, res) => { // para q?
  try {
    const sessionId = req.query.sessionId;
    console.log(sessionId)

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return res.json(session);
  } catch (error) {
    return res.status(500).send("Error al obtener información de la sesión de pago");
  }
};

const getReserves = async (req, res) => {
  const { id } = userData;

  try {
    const reserves = await Booking.findAll({
      where: {
        userId: id
      }
    })
    if (reserves) {
      return res.status(200).json(reserves);
    } else {
      return res.status(404).send('No se encontraron reservas')
    }

  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  createBooking,
  obtenerIdSeccion,
  confirmationEmail,
  getReserves
};
