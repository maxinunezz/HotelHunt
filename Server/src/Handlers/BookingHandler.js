const Stripe = require('stripe');
const { Booking, Room, User, Auth } = require('../db');
const { Op } = require('sequelize');
const stripe = new Stripe('sk_test_51NTrfKHJDBCJMNrhc1URooDk9yKEJU0TONg60genqgT77WYcIyNQlhGdEa7Gn7pvado3D6WLIbXwDwKlGBitKNF000mPbEiXwv');
const nodemailer = require('nodemailer');

const createSession = async (req, res) => {
    try {
      const roomId = req.body.roomId;
      // console.log(roomId);
  
      const room = await Room.findByPk(roomId);
      if (!room) {
        return res.status(404).json({ error: 'Habitación no encontrada.' });
      }
  
      const checkinDate = new Date(req.body.checkin);
      const checkoutDate = new Date(req.body.checkout);
  
      const formattedCheckin = checkinDate.toISOString().split('T')[0];
      const formattedCheckout = checkoutDate.toISOString().split('T')[0];
  
      // const existingBooking = await Booking.findOne({
      //   where: {
      //     roomId: roomId,
      //     userId: req.body.userId,
      //     [Op.or]: [
      //       {
      //         checkin: { [Op.between]: [formattedCheckin, formattedCheckout] },
      //       },
      //       {
      //         checkout: { [Op.between]: [formattedCheckin, formattedCheckout] },
      //       },
      //       {
      //         [Op.and]: [
      //           { checkin: { [Op.lte]: formattedCheckin } },
      //           { checkout: { [Op.gte]: formattedCheckout } },
      //         ],
      //       },
      //     ],
      //   },
      // });
      
      // if (existingBooking) {
      //   return res
      //     .status(400)
      //     .json({ error: 'Ya existe una reserva para esta habitación en las fechas indicadas.' });
      // }
  
      const unitAmount = Math.round(room.price * 100 * 0.1);

      const booking = await Booking.create({
        checkin: formattedCheckin,
        checkout: formattedCheckout,
        roomId: roomId,
        userId: req.body.userId,
        paymentStatus: 'outstanding',
      });
  
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: unitAmount,
              product_data: {
                name: 'Reserva de habitación',
                description: `Reserva de la habitación ${room.name}`,
              },
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:5173/',
        cancel_url: 'http://localhost:3001/booking/cancel',
      });
      const urlpago = session.url;
      const sessionId = session.id;

      confirmationEmail(req.body.userId, room.name)
      // console.log(confirmationEmail);
  
      return res.json({ sessionId, urlpago, booking });
    } catch (error) {
      return res.status(500).send( error);
    }
};



const CUSTOMERS = [{stripeId: "cus_123456789", email: "jenny.rosen@example.com"}];

const PRICES = {basic: "price_123456789", professional: "price_987654321"};

const sendInvoice = async function (email) {

  let customer = CUSTOMERS.find(c => c.email === email);
  let customerId;
  if (!customer) {
    customer = await stripe.customers.create({
      email,
      description: 'Customer to invoice',
    });

    CUSTOMERS.push({stripeId: customer.id, email: email});
    customerId = customer.id;
  } else {
  
    customerId = customer.stripeId;
  }

  
  const invoice = await stripe.invoices.create({
    customer: customerId,
    collection_method: 'send_invoice',
    days_until_due: 30,
  });

  // Create an Invoice Item with the Price, and Customer you want to charge
  const invoiceItem = await stripe.invoiceItems.create({ 
    customer: customerId,
    price: PRICES.basic,
    invoice: invoice.id
  });

  await stripe.invoices.sendInvoice(invoice.id);
};
  

const confirmationEmail = async (userId, roomName) => {
  try {

    const getUserEmail = async (userId) => {
      const authUser = await Auth.findOne({
        where: { userId },
        include: [{ model: User, attributes: ['email'] }]
      });
    
      if (authUser && authUser.User) {
        return authUser.User.email;
      } else {
        throw new Error('Usuario no encontrado');
      }
    };
    
    const userEmail = await getUserEmail(userId);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hotelhuntservices@gmail.com',
        pass: 'Hostalpf8'
      }
    });

    const mailOptions = {
      from: 'hotelhuntservices@gmail.com',
      to: userEmail,
      subject: 'Confirmación de la reserva',
      text: `¡Gracias por reservar la habitación! Su reserva para la habitación ${roomName} ha sido confirmada.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Correo electrónico enviado: ' + info.response);
      }
    });
  } catch (error) {
    console.log("Error en el servidor");
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
    createSession,
    obtenerIdSeccion,
    confirmationEmail
};