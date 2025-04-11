const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  // enum for status: "Pending", "In Progress", "Completed"
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Request", requestSchema);
