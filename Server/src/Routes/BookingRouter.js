const { Router } = require("express");
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const { createBooking, obtenerIdSeccion } = require("../Handlers/BookingHandler")


const BookingRouter = Router();

BookingRouter.post("/reserva",authMiddleware, createBooking);
BookingRouter.get("/obtener-informacion-sesion",authMiddleware, obtenerIdSeccion);



module.exports = BookingRouter;