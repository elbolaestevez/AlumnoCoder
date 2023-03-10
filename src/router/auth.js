const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/AuthController");

authRouter.get("/login", authController.loginView);

authRouter.post("/login", authController.loginUser);

authRouter.get("/register", authController.registerView);

authRouter.post("/register", authController.registerUser);

module.exports = authRouter;
