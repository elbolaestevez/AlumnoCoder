const authService = require("../services/authService");
const { authMiddleware, sessionValidation } = require("../middleware/auth");

//LOGIN:
const loginView = async (req, res) => {
  try {
    await authService.loginView();
  } catch (error) {
    res.send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    let foundUser = await authService.loginUser(req.body);
    if (!foundUser) {
      res.status(401).send({ error: "User not found" });
    }

    req.session.user = {
      name: foundUser.first_name,
      email: foundUser.email,
    };
    res.redirect("/");
    // res.status(200).send({ user: req.session.user });
  } catch (error) {
    res.send(error.message);
  }
};

//LOGOUT:
const logOutUser = async (req, res) => {
  try {
    req.session.destroy((error) => {
      res.redirect("/login");
    });
  } catch (error) {
    res.send(error.message);
  }
};

//REGISTER:
const registerView = async (req, res) => {
  try {
    await authService.registerView();
  } catch (error) {
    res.send(error.message);
  }
};

const registerUser = async (req, res) => {
  try {
    const user = await authService.createUser(req.body);
    res.redirect(302, "/login");
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  loginView,
  loginUser,
  registerView,
  registerUser,
  logOutUser,
};
