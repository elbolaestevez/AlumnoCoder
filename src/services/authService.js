const userModel = require("../models/user");

//LOGIN:
const loginView = async () => {
  res.render("login", {});
};

const loginUser = async (req) => {
  let user = req;
  let userFound = await userModel.findOne({ email: user.email });

  return userFound;
};

// REGISTER:
const createUser = async (req) => {
  let user = await userModel.findOne({ email: req.email });

  if (user) {
    return "usuario ya registrado";
  }

  let response = await userModel.create(req);
};

const registerView = async () => {
  res.render("register", {});
};

module.exports = { createUser, registerView, loginUser, loginView };
