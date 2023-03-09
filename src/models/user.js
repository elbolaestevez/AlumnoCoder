const mongoose = require("../db/mongodb");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
  },
});
module.exports = mongoose.model("Users", UserSchema);
