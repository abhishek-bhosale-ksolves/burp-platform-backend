const express = require("express");
const router = express.Router();
const Referral = require("../models/Referral");

// Create a new referral
router.post("/", async (req, res) => {
  const {
    candidateName,
    candidateEmail,
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
