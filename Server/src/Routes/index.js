const { Router } = require("express");
const hotelRouter = require("./HotelRouter");
const roomRouter = require("./RoomRouter");
const userRouter = require("./UserRouter");
const dashBoardRouter = require('./DashboardRouter')

const router = Router();

router.use("/hotel", hotelRouter);
router.use("/room", roomRouter);
router.use("/user", userRouter);
router.use('/dashboard', dashBoardRouter);

module.exports = router;
