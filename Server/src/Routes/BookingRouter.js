const { Router } = require("express");
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const { createBooking, getReserves, stripehook, DeleteAllreserves, getAllReserves,  } = require("../Handlers/BookingHandler")
const express = require('express');
const { SuperAdminCheck } = require("../Middleware/SuperAdminMiddleware");


const BookingRouter = Router();

BookingRouter.post("/reserva",authMiddleware, createBooking);
BookingRouter.post("/webhook", express.raw({ type: 'application/json' }), stripehook);
BookingRouter.get("/getReserves", authMiddleware, getReserves);
BookingRouter.delete("/all",authMiddleware,SuperAdminCheck,DeleteAllreserves);
BookingRouter.get("/all",getAllReserves)



module.exports = BookingRouter;