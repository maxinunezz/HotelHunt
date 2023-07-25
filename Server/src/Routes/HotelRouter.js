const { Router } = require('express');
const {
	getAllhotels,
	updateHotel,
	deleteHotel,
	getHotelsAdmin,
} = require('../Handlers/HotelHandler');

const { getForSearch } = require('../Handlers/SearchHandler');
const { authMiddleware } = require('../Middleware/AuthMiddleware');
const { SuperAdminCheck } = require('../Middleware/SuperAdminMiddleware');
const { AdminCheck } = require('../Middleware/AdminMiddleware');
const { getHotelBin } = require('../Handlers/BinHandler');

const hotelRouter = Router();
hotelRouter.post('/search', getForSearch);
hotelRouter.get('/', getAllhotels);
hotelRouter.get('/admin', authMiddleware, SuperAdminCheck, getHotelsAdmin);
hotelRouter.get('/hotelsBin', authMiddleware, AdminCheck, getHotelBin);
hotelRouter.put('/:id', authMiddleware, SuperAdminCheck, updateHotel);
hotelRouter.delete('/:id', authMiddleware, SuperAdminCheck, deleteHotel);

module.exports = hotelRouter;
