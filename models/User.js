const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: String,
  firstName: String,
  lastName: String,
  email: String,
  photo: String,
  role: {
    type: String,
    enum: ["employee", "reviewer", "admin"],
    default: "employee",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
