const { Router } = require("express")

const {
    getAllRooms,
    updateRoom,
    deleteRoom,
  } = require("../Handlers/RoomsHandler");
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const { SuperAdminCheck } = require("../Middleware/SuperAdminMiddleware");

const roomRouter = Router();

roomRouter.get("/:hotelId", getAllRooms);
roomRouter.put("/:id",authMiddleware, SuperAdminCheck, updateRoom);
roomRouter.delete("/:id",authMiddleware, SuperAdminCheck, deleteRoom);


module.exports = roomRouter;