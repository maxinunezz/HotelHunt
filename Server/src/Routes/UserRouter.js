const { Router } = require("express");
const { LoginMiddleware } = require('../Middleware/Login');
const { AuthHandler } = require('../Handlers/AuthHandler');

const {
    createUserForEmail,
    deleteUser,
    updateUser,
    } = require("../Handlers/UsersHandler.js");

const userRouter = Router();


userRouter.post("/signup", createUserForEmail);
userRouter.get("/auth", AuthHandler);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id",LoginMiddleware, updateUser);


module.exports = userRouter;