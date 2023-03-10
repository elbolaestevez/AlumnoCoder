const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/AuthController");
const { authMiddleware, sessionValidation } = require("../middleware/auth");

authRouter.get("/login", sessionValidation, authController.loginView);

authRouter.post("/login", sessionValidation, authController.loginUser);

authRouter.get("/register", authController.registerView);

authRouter.post("/register", authController.registerUser);

authRouter.post("/logout", sessionValidation, authController.logOutUser);

module.exports = authRouter;
