const { Router } = require("express")

const {
    getAllRooms,
    updateRoom,
    deleteRoom,
  } = require("../Handlers/RoomsHandler");
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const { BothAccess } = require('../Middleware/BothMiddleware');

const roomRouter = Router();

roomRouter.get("/:hotelId", getAllRooms);//front
roomRouter.put("/:id",authMiddleware, BothAccess, updateRoom);// superadmin => sirve para admin?
roomRouter.delete("/:id",authMiddleware, BothAccess, deleteRoom);// superadmin


module.exports = roomRouter;