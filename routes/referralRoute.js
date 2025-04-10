const express = require("express");
const router = express.Router();
const Referral = require("../models/Referral");

// Create a new referral
router.post("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const {
    candidateName,
    candidateEmail,
    candidateExperience,
    candidatePhone,
    candidateLinkedIn,
    candidateResume,
    currentEmployer,
    noticePeriod,
    positionId,
    referredBy,
  } = req.body;

  try {
    const newReferral = new Referral({
      candidateName,
      candidateEmail,
      candidateExperience,
      candidatePhone,
      candidateLinkedIn,
      candidateResume,
      currentEmployer,
      noticePeriod,
      positionId,
      referredBy,
    });

    await newReferral.save();
    res.status(201).json(newReferral);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all referrals
router.get("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const referrals = await Referral.find();
    res.status(200).json(referrals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
