const { Router } = require("express");
const {  authMiddleware } = require('../Middleware/authMiddleware');
const { AuthHandler } = require('../Handlers/AuthHandler');

const {
    createUserForEmail,
    deleteUser,
    updateUser,
    } = require("../Handlers/UsersHandler.js");

const userRouter = Router();


userRouter.post("/signup", createUserForEmail);
userRouter.post("/auth", AuthHandler);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", authMiddleware, updateUser);


module.exports = userRouter;