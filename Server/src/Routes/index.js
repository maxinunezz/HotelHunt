const { Router } = require("express");
const hotelRouter = require("./HotelRouter");
const roomRouter = require("./RoomRouter");
const userRouter = require("./UserRouter");

const router = Router();

router.use("/hotel", hotelRouter);
router.use("/room", roomRouter);
router.use("/user", userRouter);

module.exports = router;
