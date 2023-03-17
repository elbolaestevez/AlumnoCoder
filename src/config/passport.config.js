const passport = require("passport");
const local = require("passport-local");
const userService = require("../models/user");
const { createHash, isValidPassword } = require("../utils/index");

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  //Logica de registro con passport
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          let user = await userService.findOne({ email: username });
          if (user) {
            console.log("Usuario ya existe");
            return done(ull, flase);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          let result = await userService.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error al obtener el usuario: " + error);
        }
      }
    )
  );

  //Logica de login con passport:
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userService.findOne({ email: username });
          //   console.log("USERNAME DEL PASSSPORT.CONFIG:", user);
          if (!user) {
            console.log("Usuario no existe");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) return done(null, false);

          
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  let user = await userService.findOne({ email });
  done(null, user);
});

module.exports = { initializePassport };
