const {getAllHotelsById, getRoomsByHotel} = require ('../Handlers/DashBoardHandler')
const { Router } = require("express");


const dashBoardRouter = Router()

dashBoardRouter.get('/:id',getAllHotelsById)
dashBoardRouter.get('/room/:hotelId', getRoomsByHotel)



module.exports = dashBoardRouter

