const express = require("express");
const router = express.Router();
const Course = require("../models/course");

// Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Add a course
router.post("/", async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course added!" });
});

module.exports = router;
