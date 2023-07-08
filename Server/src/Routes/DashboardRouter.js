const {getAllHotelsById, getRoomsByHotel, createRoomByHotel, deleteRoomsByHotel, deleteHotelByUser, createHotelByUser, UpdateRoomsByHotel, UpdateHotelByUser, deleteAccount, updateAccount, restoreRoom, restoreHotel} = require ('../Handlers/DashBoardHandler')
const { Router } = require("express");
const { authMiddleware } = require('../Middleware/AuthMiddleware');
const { AdminCheck } = require('../Middleware/AdminMiddleware');
const { BothAccess } = require('../Middleware/BothMiddleware');


const dashBoardRouter = Router()

dashBoardRouter.get('/', authMiddleware, AdminCheck, getAllHotelsById);
dashBoardRouter.get('/room/:hotelId',authMiddleware, AdminCheck, getRoomsByHotel);
dashBoardRouter.post('/room/:hotelId', authMiddleware, AdminCheck, createRoomByHotel);
dashBoardRouter.post('/hotel',authMiddleware, AdminCheck,createHotelByUser);
dashBoardRouter.put('/room/:roomId', authMiddleware,AdminCheck, UpdateRoomsByHotel);
dashBoardRouter.put('/hotel/:hotelId', authMiddleware, AdminCheck,UpdateHotelByUser);
dashBoardRouter.put('/user',authMiddleware,BothAccess,updateAccount);
dashBoardRouter.delete('/user',authMiddleware ,BothAccess, deleteAccount);
dashBoardRouter.delete('/room/:roomId', authMiddleware, AdminCheck,deleteRoomsByHotel);
dashBoardRouter.delete('/hotel/:id', authMiddleware,AdminCheck, deleteHotelByUser);
dashBoardRouter.put("/room/:roomId/restore", authMiddleware, AdminCheck, restoreRoom);
dashBoardRouter.put("/hotel/:hotelId/restore", authMiddleware, AdminCheck, restoreHotel)



module.exports = dashBoardRouter

