const { Router } = require("express");
const { getallhotels, createHotel } = require("../Handlers/HotelHandler");
const { CreateUserForEmail } = require("../Handlers/UsersHandler");
const { createRoom, getRoombyId, updateRoom, deleteRoom, getAllRooms} = require("../Handlers/RoomHandler")

const router = Router();

router.get("/hotels", getallhotels);
router.post("/hotel", createHotel);
router.post("/singup", CreateUserForEmail);

router.get("/room", getAllRooms);
router.get("/room/:id", getRoombyId);
router.post("/room", createRoom);
router.delete("/room/:id", deleteRoom);
router.put("/room/:id", updateRoom);


module.exports = router;