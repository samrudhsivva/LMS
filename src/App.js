import "./App.css";
import { Login } from "./components/loginPage.js"; // Explicitly specifying the .js extension
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FacultyHomePage from "./components/facultyHome.js"; // Explicitly specifying the .js extension
import StudentDetails from "./components/studentDetails.js"; // Explicitly specifying the .js extension
import { courses } from "./JSON_DataFiles/courses.js"; // Explicitly specifying the .js extension
import studentCourses from "./JSON_DataFiles/studentCourses.js"; // Explicitly specifying the .js extension
import AdminDashboard from "./components/adminHome.js"; // Explicitly specifying the .js extension
import {
  faculties,
  students,
  semesters,
  course,
} from "./JSON_DataFiles/adminMock.js"; // Explicitly specifying the .js extension
import Student from "./components/Student.js"; // Explicitly specifying the .js extension
import CourseDetailPage from "./components/coursePage.js"; // Explicitly specifying the .js extension
import { FacultyCourses } from "./components/facultyCourses.js"; // Explicitly specifying the .js extension
import Grades from "./components/Grades.js"; // Explicitly specifying the .js extension

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <div>
            <h3>LMS Application</h3>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/faculty"
            element={<FacultyHomePage courses={courses} />}
          />
          <Route
            path="/student"
            element={<Student studentCourses={studentCourses} />}
          />
          <Route path="/faculty/courses" element={<FacultyCourses />} />
          <Route path="/faculty/coursePage" element={<CourseDetailPage />} />
          <Route
            path="/admin"
            element={
              <AdminDashboard
                faculties={faculties}
                semesters={semesters}
                course={course}
                students={students}
              />
            }
          />
          <Route
            path="/faculty/courses/grades/:studentId"
            element={<Grades />}
          />
          <Route
            path="/studentDetails/:studentId"
            element={<StudentDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
