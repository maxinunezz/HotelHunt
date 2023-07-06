const {dashBoardHandler} = require ('../Handlers/DashBoardHandler')
const { Router } = require("express");


const dashBoardRouter = Router()

dashBoardRouter.get('/:id',dashBoardHandler)



module.exports = dashBoardRouter