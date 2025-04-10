const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  candidateEmail: { type: String, required: true },
  candidateExperience: { type: String, required: true },
  candidatePhone: { type: String, required: true },
  candidateLinkedIn: { type: String, required: true },
  candidateResume: { type: String, required: true },
  currentEmployer: { type: String, required: true },
  noticePeriod: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Hired", "Rejected"],
    default: "Pending",
  },
  positionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Position",
    required: true,
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Referral", referralSchema);
