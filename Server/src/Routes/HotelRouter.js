const { Router } = require("express");
const {
    getAllhotels,
    createHotel,
    updateHotel,
    deleteHotel,
    } = require("../Handlers/HotelHandler");

const { getForSearch } = require("../Handlers/SearchHandler")

const hotelRouter = Router();
hotelRouter.post("/search", getForSearch)
hotelRouter.get("/", getAllhotels);
hotelRouter.post("/", createHotel);
hotelRouter.put("/:id", updateHotel);
hotelRouter.delete("/:id", deleteHotel);


module.exports = hotelRouter;
