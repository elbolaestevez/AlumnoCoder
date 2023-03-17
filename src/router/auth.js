const { Router } = require("express");
const authRouter = Router();
const passport = require("passport");
const authController = require("../controllers/AuthController");
const { authMiddleware, sessionValidation } = require("../middleware/auth");

authRouter.get("/login", authController.loginView);

authRouter.post("/login", sessionValidation, authController.loginUser);

authRouter.get("/register", authController.registerView);

// authRouter.post("/register", authController.registerUser);

authRouter.post(
  "/register",
  passport.authenticate("register", { successRedirect: "/auth/login" }),
  async (req, res) => {
    res.send({ status: "success", message: "Usuario registrado con éxito" });
  }
);

authRouter.get("/logout", authController.logOutUser);

authRouter.get("/restorePassword", authController.restorePasswordView);

authRouter.post("/restorePassword", authController.restorePassword);

module.exports = authRouter;
