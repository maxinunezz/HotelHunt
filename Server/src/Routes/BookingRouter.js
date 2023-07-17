const { Router } = require("express");
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const { createBooking, obtenerIdSeccion, getReserves } = require("../Handlers/BookingHandler")


const BookingRouter = Router();

BookingRouter.post("/reserva",authMiddleware, createBooking);
BookingRouter.get("/obtener-informacion-sesion",authMiddleware, obtenerIdSeccion);
BookingRouter.get("/getReserves", authMiddleware, getReserves);



module.exports = BookingRouter;