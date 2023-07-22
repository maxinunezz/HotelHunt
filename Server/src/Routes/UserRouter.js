const { Router } = require("express");
const { AuthHandler } = require("../Handlers/AuthHandler");
const {
  createUserForEmail,
  deleteUser,
  updateUser,
  askForPass,
  validateToken,
  recoveryPass,
  handleFavorite,
} = require("../Handlers/UsersHandler.js");
const { authMiddleware } = require("../Middleware/AuthMiddleware");
const { SuperAdminCheck } = require("../Middleware/SuperAdminMiddleware");
const { confirmedAccount } = require("../Handlers/ConfirmEmailHandler");
const { googleVerify } = require("../Middleware/GoogleMiddleware");
const { authGoogle } = require("../Handlers/GoogleAuthHandler");

const userRouter = Router();

//ruta nodemailer.
userRouter.post("/google_singin", googleVerify, authGoogle);
userRouter.get("/confirmEmail/:token", confirmedAccount);
userRouter.post("/signup", createUserForEmail);
userRouter.post("/auth", AuthHandler);
userRouter.delete("/:id", authMiddleware, SuperAdminCheck, deleteUser);
userRouter.put("/:id", authMiddleware, SuperAdminCheck, updateUser);
userRouter.get("/askpass/:email", askForPass);
userRouter.get("/validateAsk/:token", validateToken);
userRouter.put("/updatePass", authMiddleware, recoveryPass);
userRouter.post("/favorites/:id", authMiddleware, handleFavorite);

module.exports = userRouter;
