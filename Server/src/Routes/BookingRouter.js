const { Router } = require("express");
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const { createSession, obtenerIdSeccion } = require("../Handlers/BookingHandler")


const BookingRouter = Router();

BookingRouter.post("/reserva", createSession);
BookingRouter.get("/obtener-informacion-sesion", obtenerIdSeccion);
BookingRouter.get("/success", );
BookingRouter.get("/cancel",);


module.exports = BookingRouter;