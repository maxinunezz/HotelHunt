const { Router } = require("express");
const { AuthHandler } = require('../Handlers/AuthHandler');

const {
    createUserForEmail,
    deleteUser,
    updateUser,
    } = require("../Handlers/UsersHandler.js");

const userRouter = Router();


userRouter.post("/signup", createUserForEmail);//*
userRouter.post("/auth", AuthHandler);//*
userRouter.delete("/:id", deleteUser);// super
userRouter.put("/:id", updateUser);// super


module.exports = userRouter;