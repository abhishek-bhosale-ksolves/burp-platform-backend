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
    status = "Pending",
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
      status,
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

// Get referrals by user ID
router.get("/user/:userId", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const referrals = await Referral.find({ referredBy: req.params.userId });
    res.status(200).json(referrals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a referral by ID
router.get("/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const referral = await Referral.findById(req.params.id);
    if (!referral) {
      return res.status(404).json({ message: "Referral not found" });
    }
    res.status(200).json(referral);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a referral by ID
router.put("/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    if (
      req.body.status &&
      !["Pending", "In Progress", "Hired", "Rejected"].includes(req.body.status)
    ) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const referral = await Referral.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!referral) {
      return res.status(404).json({ message: "Referral not found" });
    }
    res.status(200).json(referral);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
