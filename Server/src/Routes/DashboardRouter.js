const {getAllHotelsById} = require ('../Handlers/DashBoardHandler')
const { Router } = require("express");


const dashBoardRouter = Router()

dashBoardRouter.get('/:id',getAllHotelsById)



module.exports = dashBoardRouter

