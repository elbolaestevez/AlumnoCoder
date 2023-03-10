const userModel = require("../models/user");
const { createHash } = require("../utils/index");

//LOGIN:
const loginView = async () => {
  res.render("login", {});
};

// const loginUser = async (req) => {
//   let user = req;
//   let userFound = await userModel.findOne({ email: user.email });

//   if(!userFound || isValidPassword(userFound, user.password)){
//     res.send("login error. Usuario no existe o contraseña incorrecta.")
//   }
//   return userFound;
// };

// REGISTER:
const createUser = async (req) => {
  const { first_name, last_name, age, email, password } = req;
  let newUser = {
    first_name,
    last_name,
    age,
    email,
    password: createHash(password),
  };

  try {
    let user = await userModel.findOne({ email: req.email });
    if (user) {
      return "usuario ya registrado";
    }
    let response = await userModel.create(newUser);
  } catch (error) {
    console.log(error);
    res.send("register error");
  }
};

const registerView = async () => {
  res.render("register", {});
};

module.exports = { createUser, registerView, loginView };
