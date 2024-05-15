import React from "react";
import { Link } from "react-router-dom";
import { studentsEnrolled } from "../JSON_DataFiles/studentsEnrolled.js";

const FacultyHomePage = ({ courses }) => {
  console.log("courses are", courses);
  return (
    <div>
      <nav>
        <Link to="/faculty/courses">Course Student List</Link>
        <Link to="/faculty/coursePage">Course Page</Link>
      </nav>
      <h1>Dashboard</h1>
      <div>
        <h2>Current Semester Published Courses</h2>
        {courses.map((course) => (
          <div>
            {course?.isPublished ? <div>{course?.name}</div> : null}
            {studentsEnrolled.map((student) => {
              <>{student.students}</>;
            })}
          </div>
        ))}
        <h2>Current Semester Unpublished Courses</h2>
        {courses.map((course) => (
          <div>{course?.isPublished ? null : <div>{course?.name}</div>}</div>
        ))}
      </div>
      <div>
        <h2>Previous Semester Courses</h2>
        {courses.map((course) => (
          <div key={course?.id}>
            <Link to={`/course/${course?.id}`}>{course?.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyHomePage;
