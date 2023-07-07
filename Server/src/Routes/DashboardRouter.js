const {getAllHotelsById, getRoomsByHotel, createRoomByHotel, deleteRoomsByHotel, deleteHotelByUser, createHotelByUser, UpdateRoomsByHotel, UpdateHotelByUser, deleteAccount} = require ('../Handlers/DashBoardHandler')
const { Router } = require("express");
const { authMiddleware } = require('../Middleware/authMiddleware');


const dashBoardRouter = Router()
// sos admin? - updateuser

dashBoardRouter.get('/', authMiddleware, getAllHotelsById);
dashBoardRouter.get('/room/:hotelId', getRoomsByHotel);
dashBoardRouter.post('/room/:hotelId', authMiddleware, createRoomByHotel);
dashBoardRouter.delete('/room/:roomId', authMiddleware, deleteRoomsByHotel);
dashBoardRouter.delete('/hotel/:id', authMiddleware, deleteHotelByUser);
dashBoardRouter.post('/hotel',authMiddleware, createHotelByUser);
dashBoardRouter.put('/room/:roomId', authMiddleware, UpdateRoomsByHotel);
dashBoardRouter.put('/hotel/:hotelId', authMiddleware, UpdateHotelByUser);
dashBoardRouter.delete('/user',authMiddleware , deleteAccount);



module.exports = dashBoardRouter

