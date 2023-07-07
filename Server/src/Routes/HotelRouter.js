const { Router } = require("express");
const {
    getAllhotels,
    updateHotel,
    deleteHotel,
    } = require("../Handlers/HotelHandler");

const { getForSearch } = require("../Handlers/SearchHandler");
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const { BothAccess } = require('../Middleware/BothMiddleware');

const hotelRouter = Router();
hotelRouter.post("/search", getForSearch)//*
hotelRouter.get("/", getAllhotels); //*
hotelRouter.put("/:id",authMiddleware, BothAccess, updateHotel);//super => sirve para admin?
hotelRouter.delete("/:id",authMiddleware, BothAccess, deleteHotel);//super


module.exports = hotelRouter;
