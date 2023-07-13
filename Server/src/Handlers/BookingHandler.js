const Stripe = require('stripe');
const { Booking, Room } = require('../db');
const { Op } = require('sequelize');
const stripe = new Stripe('sk_test_51NRjhwAYwVhROlt981ggLGqQf8k4VDlAyhC9zuBPsKLeBP5NU95V76pm3yKU9ivW9e7RsBfEa8WJMcPyJ91hqNW600YkcHrnjL');


const createSession = async (req, res) => {
    try {
        const roomId = req.body.roomId;
        console.log(roomId);

        const room = await Room.findByPk(roomId);
        if (!room) {
            return res.status(404).json({ error: 'Habitación no encontrada.' });
        }
        const existingBooking = await Booking.findOne({
            where: {
                roomId: roomId,
                [Op.or]: [
                    {
                        checkin: { [Op.between]: [req.body.checkin, req.body.checkout] },
                    },
                    {
                        checkout: { [Op.between]: [req.body.checkin, req.body.checkout] },
                    },
                    {
                        [Op.and]: [
                            { checkin: { [Op.lte]: req.body.checkin } },
                            { checkout: { [Op.gte]: req.body.checkout } },
                        ],
                    },
                ],
            },
        });
        if (existingBooking) {
            return res.status(400).json({ error: 'Ya existe una reserva para esta habitación en las fechas indicadas.' });
        }

        const unitAmount = Math.round(room.price * 100 * 0.1);

        const booking = await Booking.create({
            checkin: req.body.checkin,
            checkout: req.body.checkout,
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
        console.log(session);
        const urlpago = session.url
        const sessionId = session.id
        
        return res.json({sessionId,  urlpago, booking});
    } catch (error) {
        return res.status(500).send("Error al crear la sesión de pago");
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
    obtenerIdSeccion
};