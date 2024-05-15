import React, { useState } from "react";

const Course = () => {
  const [courseId, setCourseId] = useState("");
  const [course, setCourse] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  const [assignment, setAssignment] = useState("");
  const [quiz, setQuiz] = useState("");
  const [syllabusContent, setSyllabusContent] = useState("");
  const APP_URL = 'http://54.147.25.67:5000';
  const handleCourseIdChange = (event) => {
    setCourseId(event.target.value);
  };

  const fetchCourse = async () => {
    try {
      const response = await fetch(`${APP_URL}/api/courses/${courseId}`);
      if (response.ok) {
        const data = await response.json();
        setCourse(data);
      } else {
        setCourse(null);
        console.error("Course not found");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const addAnnouncement = async () => {
    if (course) {
      try {
        const response = await fetch(`${APP_URL}/api/courses/${courseId}/announcement`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ announcement }),
        });
        if (response.ok) {
          const updatedCourse = await response.json();
          setCourse(updatedCourse);
          setAnnouncement("");
        } else {
          console.error("Error adding announcement");
        }
      } catch (error) {
        console.error("Error adding announcement:", error);
      }
    }
  };

  const addAssignment = async () => {
    if (course) {
      try {
        const response = await fetch(`${APP_URL}/api/courses/${courseId}/assignment`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ assignment }),
        });
        if (response.ok) {
          const updatedCourse = await response.json();
          setCourse(updatedCourse);
          setAssignment("");
        } else {
          console.error("Error adding assignment");
        }
      } catch (error) {
        console.error("Error adding assignment:", error);
      }
    }
  };

  const addQuiz = async () => {
    if (course) {
      try {
        const response = await fetch(`${APP_URL}/api/courses/${courseId}/quiz`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quiz }),
        });
        if (response.ok) {
          const updatedCourse = await response.json();
          setCourse(updatedCourse);
          setQuiz("");
        } else {
          console.error("Error adding quiz");
        }
      } catch (error) {
        console.error("Error adding quiz:", error);
      }
    }
  };

  const addSyllabusContent = async () => {
    if (course) {
      try {
        const response = await fetch(`${APP_URL}/api/courses/${courseId}/syllabus`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ syllabusContent: course.syllabus + " " + syllabusContent }),
        });
        if (response.ok) {
          const updatedCourse = await response.json();
          setCourse(updatedCourse);
          setSyllabusContent("");
        } else {
          console.error("Error updating syllabus");
        }
      } catch (error) {
        console.error("Error updating syllabus:", error);
      }
    }
  };

  return (
    <div>
      <h1>Course Management</h1>
      <div>
        <label>Enter Course ID: </label>
        <input
          type="text"
          value={courseId}
          placeholder="course-001"
          onChange={handleCourseIdChange}
        />
        <button onClick={fetchCourse}>Fetch Course</button>
      </div>
      {course ? (
        <div>
          <h2>{course.name}</h2>
          <div>
            <h3>Content</h3>
            <p>{course.content}</p>
          </div>
          <div>
            <h3>Syllabus</h3>
            <p>{course.syllabus}</p>
            <input
              type="text"
              value={syllabusContent}
              onChange={(e) => setSyllabusContent(e.target.value)}
              placeholder="Add Syllabus Content"
            />
            <button onClick={addSyllabusContent}>Add to Syllabus</button>
          </div>
          <div>
            <h3>Announcements</h3>
            <ul>
              {course.announcements.map((announcement, index) => (
                <li key={index}>{announcement}</li>
              ))}
            </ul>
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="Add Announcement"
            />
            <button onClick={addAnnouncement}>Post Announcement</button>
          </div>
          <div>
            <h3>Assignments</h3>
            <ul>
              {course.assignments.map((assignment, index) => (
                <li key={index}>{assignment}</li>
              ))}
            </ul>
            <input
              type="text"
              value={assignment}
              onChange={(e) => setAssignment(e.target.value)}
              placeholder="Add Assignment"
            />
            <button onClick={addAssignment}>Add Assignment</button>
          </div>
          <div>
            <h3>Quizzes</h3>
            <ul>
              {course.quizzes.map((quiz, index) => (
                <li key={index}>{quiz}</li>
              ))}
            </ul>
            <input
              type="text"
              value={quiz}
              onChange={(e) => setQuiz(e.target.value)}
              placeholder="Add Quiz"
            />
            <button onClick={addQuiz}>Add Quiz</button>
          </div>
        </div>
      ) : (
        <p>No course found for ID: {courseId}</p>
      )}
    </div>
  );
};

export default Course;
