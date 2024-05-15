// Grades.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { studentsEnrolled } from '../JSON_DataFiles/studentsEnrolled.js';

const Grades = () => {
  const { studentId: sid } = useParams();

  // Find the student with the matching studentId
  const student = studentsEnrolled
    .flatMap(course => course.students)
    .find(student => student.studentId === sid);

  const [grade, setGrade] = useState(student?.grades);
  const [newGrade, setNewGrade] = useState('');

  const handleGradeChange = (event) => {
    setNewGrade(event.target.value);
  };

  const gradeHandler = () => {
    if (student) {
      student.grades = parseInt(newGrade, 10);
      setGrade(student.grades);
      setNewGrade('');
    }
  };

  return (
    <div>
      <h1>Student Grade</h1>
      {student ? (
        <div>
          <p>Name: {student.name}</p>
          <p>Email: {student.email}</p>
          <p>Grades: {grade}</p>
          <input
            name="grade"
            value={newGrade}
            type="text"
            onChange={handleGradeChange}
            placeholder="Enter new grade"
          />
          <button onClick={gradeHandler}>Edit Grade</button>
        </div>
      ) : (
        <p>No grades found for student ID: {sid}</p>
      )}
    </div>
  );
};

export default Grades;