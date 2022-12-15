const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide the username"] },

  email: { type: String, required: [true, "Please provide the email"], unique: true },

  password: { type: String, required: [true, "Please provide the password"], min: 6 },

  image: { type: String, required: [true, "Please provide the image"] },

  places: [{ type: mongoose.Types.ObjectId, required: [true, "Please provide the places"], ref: "Place" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
