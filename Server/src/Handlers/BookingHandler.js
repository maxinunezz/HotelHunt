const Stripe = require('stripe');
const { Booking, Room, User, Hotel, Auth } = require('../db');
const { Op } = require('sequelize');
const stripe = new Stripe('sk_test_51NTrfKHJDBCJMNrhc1URooDk9yKEJU0TONg60genqgT77WYcIyNQlhGdEa7Gn7pvado3D6WLIbXwDwKlGBitKNF000mPbEiXwv');
const nodemailer = require('nodemailer');
const endpointSecret = "whsec_ed391f08ba83c4f8e82d04709ee19174dcbd2b36cdbaaadcbc3cc7817a778a45";
require('dotenv').config();

async function createBooking(req, res) {
  
  try {
    const { id } = userData
    const { roomsToReserve } = req.body;


    if (!roomsToReserve || !Array.isArray(roomsToReserve) || roomsToReserve.length === 0) {
      return res.status(400).send( "No se proporcionan habitaciones para reservar" );
    }

    const bookings = [];

    const rooms = await Promise.all(
      roomsToReserve.map(async (room) => {
        const roomDetails = await Room.findByPk(room.roomId);
        return {
          ...room,
          hotelId: roomDetails.hotelId,
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

    const calculateDays = (item) => {

      const checkinDate = new Date(item.checkin);
      const checkoutDate = new Date(item.checkout);

      const differenceInMs = checkoutDate.getTime() - checkinDate.getTime();
      const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

      return differenceInDays;
    };

    const user = await User.findByPk(id);

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
      success_url: `http://localhost:5173/paymenttransition`,
      cancel_url: `http://localhost:5173/`,
    });
    const price = session.amount_total / 100;
    const name = user.name
    const sessionId = session.id;
    const urlpago = session.url;

    for (const room of rooms) {
      const { roomId, checkin, checkout, hotelId } = room;

      const isReserved = await isRoomAlreadyReserved(roomId, checkin, checkout, hotelId);
      if (!isReserved) {
        const booking = await Booking.create({
          hotelId,
          roomId,
          userId: id,
          checkin,
          checkout,
          paymentStatus: "unpaid",
          sessionId: sessionId,
          price,
        });

        bookings.push(booking);

      } else {
        return res.status(400).json(`Room with ID ${roomId} is already reserved for the selected dates`);
      }


    }
    
    await confirmationEmail(id, urlpago, name);

    res.status(200).json({ sessionId, urlpago, bookings })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


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
      res.status(500).send('Error en el servidor');
  }
};


const getReserves = async (req, res) => {
  const { id } = userData;
  let reservas = [];

  try {
    const reserves = await Booking.findAll({
      where: {
        userId: id
      }
    })

    

    for(const reserve of reserves){
      const room = await Room.findByPk(reserve.roomId);
      const hotel = await Hotel.findByPk(room.hotelId);
      const one_reserve = {
        room: room.name,
        hotel: hotel.name,
        checkin: reserve.checkin,
        checkout: reserve.checkout,
        paymentStatus: reserve.paymentStatus,
        price: reserve.price,
      }
      reservas.push(one_reserve);

    }


    if (reservas) {
      return res.status(200).json(reservas);
    } else {
      return res.status(404).send('No se encontraron reservas')
    }

  } catch (error) {
    return res.status(500).json(error)
  }
}



const stripehook = async (req, res) => {
  /*const sig = req.headers['stripe-signature'];
  const payload = req.body;

  console.log(payload)
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    console.log('Event:', event);
    console.log('Event type:', event.type);
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);    
  }*/
  const sessionId = req.body.data.object.id;
  const status = req.body.data.object.payment_status;
  

  try {
    const updateBooking = await Booking.findAll({where: {
      sessionId: sessionId,
    }})

    for(const booking of updateBooking){
      await booking.update({paymentStatus: status})
    }

    res.status(200).send('reserva actualizada')
    
  } catch (error) {
    res.status(500).json(error);
  }
    
};

module.exports = {
  createBooking,
  confirmationEmail,
  getReserves,
  stripehook
};