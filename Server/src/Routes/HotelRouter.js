const { Router } = require("express");
const {
    getAllhotels,
    createHotel,
    updateHotel,
    deleteHotel,
    } = require("../Handlers/HotelHandler");


const hotelRouter = Router();

hotelRouter.get("/", getAllhotels);
hotelRouter.post("/", createHotel);
hotelRouter.put("/:id", updateHotel);
hotelRouter.delete("/:id", deleteHotel);


module.exports = hotelRouter;
