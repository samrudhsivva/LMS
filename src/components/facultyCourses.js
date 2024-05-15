import React, { useState } from "react";
import { courses } from "../JSON_DataFiles/courses.js";
import { studentsEnrolled } from "../JSON_DataFiles/studentsEnrolled.js";
import { Link } from "react-router-dom";
export const FacultyCourses = () => {
    const [courseId, setCourseId] = useState("course-001");

    const filterStudentsByCourseId = (courseId) => {
        return studentsEnrolled
            .filter(course => course.courseId === courseId)
            .flatMap(course => course.students);
    };

    const students = filterStudentsByCourseId(courseId);
    console.log("filter students by Course ID", students);

    const handleInputChange = (event) => {
        setCourseId(event.target.value);
    };

    return (
        <div>
            <div>Enter a course-ID</div>
            <input
                name="courseID"
                value={courseId}
                onChange={handleInputChange}
            />
            <ul>
                {students.map((student) => (
                    <div>
                        <li key={student.studentId}>{student?.name}</li>
                        <Link to={`/faculty/courses/grades/${student.studentId}`}><button>view grade</button></Link>
                    </div>
                ))}
            </ul>
        </div >
    );
};