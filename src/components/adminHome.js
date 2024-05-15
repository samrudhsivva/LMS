import React, { useState, useEffect } from "react";
import { studentsEnrolled } from '../JSON_DataFiles/studentsEnrolled.js';

const AdminPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState("");
  const [semester, setSemester] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedFacultyId, setSelectedFacultyId] = useState("");
  const [newCourseId, setNewCourseId] = useState("");
  const [newCourseName, setNewCourseName] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [facultyNameInput, setFacultyNameInput] = useState("");
  const [assignedFaculty, setAssignedFaculty] = useState("");

  const [facultyNameInput1, setFacultyNameInput1] = useState("");
  const [assignedFaculty1, setAssignedFaculty1] = useState("");
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/courses");
      const data = await response.json();
      setCourses(data);
      setFilteredCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchCoursesByFaculty = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/faculties/${facultyNameInput}/courses`
      );
      const data = await response.json();
      setFilteredCourses(data);
      console.log("Fetched courses:", data);
    } catch (error) {
      console.error("Error fetching courses by faculty:", error);
    }
  };

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/faculties");
        const data = await response.json();
        setFaculties(data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchCourses();
    fetchFaculties();
  }, []);

  useEffect(() => {
    if (facultyNameInput) {
      fetchCoursesByFaculty();
    }
    console.log("fac", facultyNameInput);
  }, [facultyNameInput]);

  const filterCourses = () => {
    let filtered = courses;
    if (faculty) {
      filtered = filtered.filter((course) => course.facultyId === faculty);
    }
    if (semester) {
      filtered = filtered.filter((course) => course.semester === semester);
    }
    setFilteredCourses(filtered);
  };

  const assignCourse = async () => {
    try {
      // Check if facultyNameInput is empty
      if (!facultyNameInput1) {
        console.error("Faculty name is required");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/faculties/${facultyNameInput1}/add-course`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseName: newCourseName,
          }),
        }
      );
      const data = await response.json();
      console.log("Course assigned:", data);
      setAssignedFaculty1(facultyNameInput1);
      setNewCourseName("");
      fetchCourses();
    } catch (error) {
      console.error("Error assigning course:", error);
    }
  };

  const viewStudents = (courseId) => {
    // Filter the studentsEnrolled array to find the course with the matching courseId
    const courseData = studentsEnrolled.find(
      (course) => course.courseId === courseId
    );
    if (courseData) {
      setStudentList(courseData.students);
    } else {
      setStudentList([]);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>

      {/* Fetch Courses by Faculty */}
      <div>
        <h2>Fetch Courses by Faculty</h2>
        <label>Faculty Name:</label>
        <input
          type="text"
          value={facultyNameInput}
          onChange={(e) => setFacultyNameInput(e.target.value)}
          placeholder="Enter faculty name"
        />
        <button onClick={fetchCoursesByFaculty}>Fetch Courses</button>
      </div>

      {/* View Courses by Faculty by Semester */}
      <div>
        <h2>View Courses</h2>
        <button onClick={filterCourses}>View All Courses</button>
        {typeof filteredCourses[0] === "string" ? (
          <ul>
            {filteredCourses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>

      {/* Assign a Course to Faculty */}
      <div>
        <h2>Assign Course to Faculty</h2>
        <label>Course Name:</label>
        <input
          type="text"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
          placeholder="Enter course name"
        />
        <label>Faculty:</label>
        <input
          type="text"
          value={facultyNameInput1} // Use facultyNameInput instead of selectedFacultyId
          onChange={(e) => setFacultyNameInput1(e.target.value)} // Bind input value to state variable
          placeholder="Enter faculty name"
        />

        <button onClick={assignCourse}>Assign Course</button>
      </div>

      {/* View Student List for Each Course */}
      <div>
        <h1>Admin Page</h1>

        {/* View Student List for Each Course */}
        <div>
          <h2>View Student List</h2>
          <label>Course ID:</label>
          <input
            type="text"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            placeholder="e.g. course-001"
          />
          <button onClick={() => viewStudents(selectedCourseId)}>
            View Students
          </button>
          {studentList.length > 0 ? (
            <ul>
              {studentList.map((student) => (
                <li key={student.studentId}>
                  {student.name} - {student.email}
                </li>
              ))}
            </ul>
          ) : (
            <p>No students found for this course.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
