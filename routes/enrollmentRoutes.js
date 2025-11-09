const express = require("express");
const router = express.Router();
const Enrollment = require("../models/enrollment");

// Get all enrollments
router.get("/", async (req, res) => {
  const enrollments = await Enrollment.find()
    .populate("student")
    .populate("course");
  res.json(enrollments);
});

// Add an enrollment
router.post("/", async (req, res) => {
  const enrollment = new Enrollment(req.body);
  await enrollment.save();
  res.json({ message: "Enrollment added!" });
});

module.exports = router;
