const { Router } = require("express")

const {
    getAllRooms,
    updateRoom,
    deleteRoom,
  } = require("../Handlers/RoomsHandler");
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const { SuperAdminCheck } = require("../Middleware/SuperAdminMiddleware");
const { getRoomsBin } = require("../Handlers/BinHandler");
const { AdminCheck } = require("../Middleware/AdminMiddleware");

const roomRouter = Router();

roomRouter.get("/", getAllRooms);
roomRouter.put("/:id",authMiddleware, SuperAdminCheck, updateRoom);
roomRouter.delete("/:id",authMiddleware, SuperAdminCheck, deleteRoom);
roomRouter.get("/RoomsBin", authMiddleware, AdminCheck ,getRoomsBin)



module.exports = roomRouter;