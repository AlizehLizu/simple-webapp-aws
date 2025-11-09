function showModule(module) {
  document.querySelectorAll('.module').forEach(m => m.classList.add('d-none'));
  document.getElementById(module).classList.remove('d-none');
}

async function fetchData(endpoint) {
  return await fetch(`/${endpoint}`).then(res => res.json());
}

function filterTable(tableId, searchInputId) {
  const input = document.getElementById(searchInputId).value.toLowerCase();
  const table = document.getElementById(tableId);
  Array.from(table.rows).forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(input) ? '' : 'none';
  });
}

async function updateDashboard() {
  const students = await fetchData('students');
  const courses = await fetchData('courses');
  const enrollments = await fetchData('enrollments');

  document.getElementById('totalStudents').innerText = students.length;
  document.getElementById('totalCourses').innerText = courses.length;
  document.getElementById('totalEnrollments').innerText = enrollments.length;

  const avgCourses = students.length ? (enrollments.length / students.length).toFixed(1) : 0;
  document.getElementById('avgCourses').innerText = avgCourses;

  // Populate tables
  const sTable = document.getElementById('studentsTable');
  sTable.innerHTML = '';
  students.forEach(s => sTable.innerHTML += `<tr><td>${s.name}</td><td>${s.email}</td><td>${s.rollNumber}</td></tr>`);

  const cTable = document.getElementById('coursesTable');
  cTable.innerHTML = '';
  courses.forEach(c => cTable.innerHTML += `<tr><td>${c.name}</td><td>${c.code}</td></tr>`);

  const eTable = document.getElementById('enrollmentsTable');
  eTable.innerHTML = '';
  enrollments.forEach(e => eTable.innerHTML += `<tr><td>${e.student.name}</td><td>${e.course.name}</td></tr>`);

  // Dropdowns
  const studentSelect = document.getElementById('enrollStudent');
  const courseSelect = document.getElementById('enrollCourse');
  studentSelect.innerHTML = '';
  courseSelect.innerHTML = '';
  students.forEach(s => studentSelect.innerHTML += `<option value="${s._id}">${s.name}</option>`);
  courses.forEach(c => courseSelect.innerHTML += `<option value="${c._id}">${c.name}</option>`);
}

async function addStudent() {
  const name = document.getElementById('studentName').value;
  const email = document.getElementById('studentEmail').value;
  const rollNumber = document.getElementById('studentRoll').value;
  await fetch('/students', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name,email,rollNumber}) });
  bootstrap.Modal.getInstance(document.getElementById('addStudentModal')).hide();
  updateDashboard();
}

async function addCourse() {
  const name = document.getElementById('courseName').value;
  const code = document.getElementById('courseCode').value;
  await fetch('/courses', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({name,code}) });
  bootstrap.Modal.getInstance(document.getElementById('addCourseModal')).hide();
  updateDashboard();
}

async function addEnrollment() {
  const student = document.getElementById('enrollStudent').value;
  const course = document.getElementById('enrollCourse').value;
  await fetch('/enrollments', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({student,course}) });
  bootstrap.Modal.getInstance(document.getElementById('addEnrollmentModal')).hide();
  updateDashboard();
}

// Initial load
updateDashboard();
