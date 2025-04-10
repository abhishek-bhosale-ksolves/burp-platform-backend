// Routes for position

const express = require("express");
const router = express.Router();
const Position = require("../models/Position");

// Create a new position
router.post("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { title, description, location, experience } = req.body;
  try {
    const newPosition = new Position({
      title,
      description,
      location,
      experience,
    });
    await newPosition.save();
    res.status(201).json(newPosition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all positions
router.get("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const positions = await Position.find();
    res.status(200).json(positions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
