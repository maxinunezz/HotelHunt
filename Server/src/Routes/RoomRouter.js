const { Router } = require("express")

const {
    createRoom,
    getAllRooms,
    updateRoom,
    deleteRoom,
  } = require("../Handlers/RoomsHandler");


const roomRouter = Router();

roomRouter.get("/", getAllRooms);//front
roomRouter.post("/", createRoom);//se va
roomRouter.put("/:id", updateRoom);// superadmin
roomRouter.delete("/:id", deleteRoom);// superadmin


module.exports = roomRouter;