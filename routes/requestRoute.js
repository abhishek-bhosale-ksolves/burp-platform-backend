const express = require("express");
const router = express.Router();
const Request = require("../models/Request");

// Get all requests
router.get("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const requests = await Request.find().populate("userId");
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get requests by user ID
router.get("/:userId", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const requests = await Request.find({ userId: req.params.userId });
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a new request
router.post("/:userId", async (req, res) => {
  console.log("aslk");

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // check already exists
  const existingRequest = await Request.findOne({ userId: req.params.userId });
  if (existingRequest) {
    return res.status(400).json({ message: "Request already exists" });
  }

  try {
    const newRequest = new Request({
      userId: req.params.userId,
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a request
router.put("/:id", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // check req.body status
  if (
    req.body.status &&
    !["Pending", "Accepted", "Rejected"].includes(req.body.status)
  ) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
