const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "RECRUITER", "CANDIDATE"],
    default: "CANDIDATE",
  },
  createdAt: { type: Date, default: Date.now },
});

// Method to compare password
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model("User", UserSchema);
