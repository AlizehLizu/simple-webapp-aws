const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// Get all students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Add a student
router.post("/", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json({ message: "Student added!" });
});

module.exports = router;
