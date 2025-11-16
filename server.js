 const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/studentdb";
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schemas
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  rollNumber: String
});

const courseSchema = new mongoose.Schema({
  name: String,
  code: String
});

const enrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});

const Student = mongoose.model('Student', studentSchema);
const Course = mongoose.model('Course', courseSchema);
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

// Routes
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json({ message: 'Student added' });
});

app.get('/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

app.post('/courses', async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: 'Course added' });
});

app.get('/enrollments', async (req, res) => {
  const enrollments = await Enrollment.find().populate('student').populate('course');
  res.json(enrollments);
});

app.post('/enrollments', async (req, res) => {
  const enrollment = new Enrollment(req.body);
  await enrollment.save();
  res.json({ message: 'Enrollment added' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
