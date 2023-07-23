const { Router } = require("express");
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const { createBooking, getReserves, stripehook,  } = require("../Handlers/BookingHandler")
const express = require('express');


const BookingRouter = Router();

BookingRouter.post("/reserva",authMiddleware, createBooking);
BookingRouter.post("/webhook", express.raw({ type: 'application/json' }), stripehook);
BookingRouter.get("/getReserves", authMiddleware, getReserves);



module.exports = BookingRouter;