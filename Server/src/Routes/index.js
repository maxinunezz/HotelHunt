const { Router } = require("express");
const hotelRouter = require("./HotelRouter")
const roomRouter = require("./RoomRouter")
const { createUserForEmail } = require("../Handlers/UsersHandler");
const {
  createUserForEmail,
  deleteUser,
  updateUser,
} = require("../Handlers/UsersHandler.js");

const router = Router();

router.use("/hotel", hotelRouter);
router.use("/room", roomRouter) 
router.post("/signup", createUserForEmail);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);

module.exports = router;
