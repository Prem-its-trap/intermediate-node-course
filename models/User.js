const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  console.log(`current passwrod is ${this.password}`);
  this.password = await bcrypt.hash(this.password, 10);
  console.log(`current passwrod is ${this.password}`);
  next();
});

module.exports = mongoose.model("User", userSchema);
