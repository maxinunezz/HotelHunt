const { Router } = require("express");
const {
    getAllhotels,
    createHotel,
    updateHotel,
    deleteHotel,
    } = require("../Handlers/HotelHandler");

const { getForSearch } = require("../Handlers/SearchHandler")

const hotelRouter = Router();
hotelRouter.post("/search", getForSearch)//*
hotelRouter.get("/", getAllhotels); //*
hotelRouter.post("/", createHotel);//se va
hotelRouter.put("/:id", updateHotel);//super
hotelRouter.delete("/:id", deleteHotel);//super


module.exports = hotelRouter;
