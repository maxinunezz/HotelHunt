const { Router } = require("express");

const {
    createUserForEmail,
    deleteUser,
    updateUser,
    } = require("../Handlers/UsersHandler.js");

const userRouter = Router();


userRouter.post("/signup", createUserForEmail);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", updateUser);


module.exports = userRouter;