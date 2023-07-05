const { Router } = require("express");
const {
  getAllhotels,
  createHotel,
  updateHotel,
  deleteHotel,
} = require("../Handlers/HotelHandler");
const {
  createRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
} = require("../Handlers/RoomsHandler");
const {
  createUserForEmail,
  deleteUser,
  updateUser,
} = require("../Handlers/UsersHandler.js");

const router = Router();

router.get("/hotels", getAllhotels);
router.post("/hotel", createHotel);
router.put("/hotel/:id", updateHotel);
router.delete("/hotel/:id", deleteHotel);
router.get("/room", getAllRooms);
router.post("/room", createRoom);
router.delete("/room/:id", deleteRoom);
router.put("/room/:id", updateRoom);
router.post("/signup", createUserForEmail);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);

module.exports = router;
