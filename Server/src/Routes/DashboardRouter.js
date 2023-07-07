const {getAllHotelsById, getRoomsByHotel, createRoomByHotel, deleteRoomsByHotel, deleteHotelByUser, createHotelByUser, UpdateRoomsByHotel, UpdateHotelByUser} = require ('../Handlers/DashBoardHandler')
const { Router } = require("express");
const { authMiddleware } = require('../Middleware/authMiddleware');


const dashBoardRouter = Router()

dashBoardRouter.get('/', authMiddleware, getAllHotelsById);
dashBoardRouter.get('/room/:hotelId', getRoomsByHotel);
dashBoardRouter.post('/room/:hotelId', authMiddleware, createRoomByHotel);
dashBoardRouter.delete('/room/:roomId', authMiddleware, deleteRoomsByHotel);
dashBoardRouter.delete('/hotel/:id', authMiddleware, deleteHotelByUser);
dashBoardRouter.post('/hotel',authMiddleware, createHotelByUser);
dashBoardRouter.put('/room/:roomId', authMiddleware, UpdateRoomsByHotel);
dashBoardRouter.put('/hotel/:hotelId', authMiddleware, UpdateHotelByUser);



module.exports = dashBoardRouter

