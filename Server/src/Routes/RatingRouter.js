const { Router } = require("express")
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const { crearValoracion, getRating, eliminarValoracion, getAllRating} = require("../Handlers/RatingHandler")
const { SuperAdminCheck } = require('../Middleware/SuperAdminMiddleware');

const ratingRouter = Router();

ratingRouter.get("/:hotelId", getRating);
ratingRouter.post("/", authMiddleware, crearValoracion);
ratingRouter.delete('/:id', authMiddleware, SuperAdminCheck, eliminarValoracion);
ratingRouter.get('/', authMiddleware, SuperAdminCheck, getAllRating);




module.exports = ratingRouter;