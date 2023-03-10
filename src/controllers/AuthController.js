const authService = require("../services/authService");

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
    await authService.loginUser();
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
    const user = await authService.createUser();
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { loginView, loginUser, registerView, registerUser };
