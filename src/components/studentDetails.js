import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import studentProfiles from "../JSON_DataFiles/studentProfile.js";
import "./student.css";

const StudentDetails = () => {
  const { studentId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = () => {
      const foundProfile = studentProfiles.find((profile) => profile.id === studentId);
      setProfile(foundProfile || null);
      if (!foundProfile) {
        alert("Student not found");
      }
    };

    fetchProfile();
  }, [studentId]);

  const handleNameChange = (event) => {
    if (profile) {
      setProfile({ ...profile, name: event.target.value });
    }
  };

  const handleEmailChange = (event) => {
    if (profile) {
      setProfile({ ...profile, email: event.target.value });
    }
  };

  const handleNotificationsChange = () => {
    if (profile) {
      setProfile({ ...profile, notifications: !profile.notifications });
    }
  };

  const updateProfile = () => {
    alert("Profile updated");
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="main-container">
      <div className="profile-section">
        <label>Name:</label>
        <input type="text" value={profile.name} onChange={handleNameChange} />
        <label>Email:</label>
        <input type="text" value={profile.email} onChange={handleEmailChange} />
        <label>
          Notifications:
          <input
            type="checkbox"
            checked={profile.notifications}
            onChange={handleNotificationsChange}
          />
        </label>
        <button onClick={updateProfile}>Update Profile</button>
      </div>

      <div className="courses-section">
        <h2>Enrolled Courses</h2>
        <div>
          <h3>Current Semester Courses</h3>
          {profile.enrolledCourses
            .filter((course) => course.semester.includes("2024") || course.semester.includes("2025"))
            .map((course) => (
              <div className="course-item" key={course.id}>
                <h4>{course.name}</h4>
                {course.isPublished ? (
                  <>
                    <p>{course.content}</p>
                    <h5>Syllabus</h5>
                    <p>{course.syllabus}</p>
                    <h5>Quizzes</h5>
                    <ul>
                      {course.quizzes.map((quiz, index) => (
                        <li key={index}>{quiz}</li>
                      ))}
                    </ul>
                    <h5>Assignments</h5>
                    <ul>
                      {course.assignments.map((assignment, index) => (
                        <li key={index}>{assignment}</li>
                      ))}
                    </ul>
                    <h5>Grades</h5>
                    <p>{course.grades}</p>
                  </>
                ) : (
                  <p>Course content not published</p>
                )}
              </div>
            ))}
        </div>
        <div>
          <h3>Previous Semester Courses</h3>
          {profile.enrolledCourses
            .filter((course) => course.semester.includes("2023"))
            .map((course) => (
              <div className="course-item" key={course.id}>
                <h4>{course.name}</h4>
                {course.isPublished ? (
                  <>
                    <p>{course.content}</p>
                    <h5>Syllabus</h5>
                    <p>{course.syllabus}</p>
                    <h5>Quizzes</h5>
                    <ul>
                      {course.quizzes.map((quiz, index) => (
                        <li key={index}>{quiz}</li>
                      ))}
                    </ul>
                    <h5>Assignments</h5>
                    <ul>
                      {course.assignments.map((assignment, index) => (
                        <li key={index}>{assignment}</li>
                      ))}
                    </ul>
                    <h5>Grades</h5>
                    <p>{course.grades}</p>
                  </>
                ) : (
                  <p>Course content not published</p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
