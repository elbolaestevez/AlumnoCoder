const userModel = require("../models/user");

//LOGIN:
const loginView = async () => {
  res.render("login", {});
};

const loginUser = async () => {
  res.send("post login ok");
};

// REGISTER:
const createUser = async () => {
  let user = await userModel.findOne({ email: require.body.email });

  if (user) {
    return alert("usuario ya registrado");
  }

  let response = await userModel.insertOne(req.body);

  req.session.user = { name: req.body.nombre, email: req.body.email };
  response.render("login", { message: "Registro exitoso", status: success });
};

const registerView = async () => {
  res.render("register", {});
};

module.exports = { createUser, registerView, loginUser, loginView };
