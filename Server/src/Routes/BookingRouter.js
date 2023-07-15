const { Router } = require("express");
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const { createBooking, obtenerIdSeccion } = require("../Handlers/BookingHandler")


const BookingRouter = Router();

BookingRouter.post("/reserva", createBooking);
BookingRouter.get("/obtener-informacion-sesion",authMiddleware, obtenerIdSeccion);
BookingRouter.get("/success", );
BookingRouter.get("/cancel",);


module.exports = BookingRouter;