const { Router } = require("express");
const {
    getAllhotels,
    updateHotel,
    deleteHotel,
    } = require("../Handlers/HotelHandler");

const { getForSearch } = require("../Handlers/SearchHandler");
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const { SuperAdminCheck } = require("../Middleware/SuperAdminMiddleware");

const hotelRouter = Router();
hotelRouter.post("/search", getForSearch)
hotelRouter.get("/", getAllhotels);
hotelRouter.put("/:id",authMiddleware, SuperAdminCheck, updateHotel);
hotelRouter.delete("/:id",authMiddleware, SuperAdminCheck, deleteHotel);


module.exports = hotelRouter;
