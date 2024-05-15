import React, { useState } from "react";
import { Link } from 'react-router-dom';
import studentProfiles from "../JSON_DataFiles/studentProfile.js";
import "./student.css";

const Student = () => {
    const [studentId, setStudentId] = useState("");
    const [profile, setProfile] = useState(null);

    const handleStudentIdChange = (event) => setStudentId(event.target.value);

    const fetchProfile = () => {
        const foundProfile = studentProfiles.find((profile) => profile.id === studentId);
        setProfile(foundProfile || null);
        if (!foundProfile) {
            alert("Student not found");
        }
    };

   

    return (
        <div className="container">
            <h1>Student Profile</h1>
            <div className="profile-section">
                <label>Enter Student ID:</label>
                <input type="text" value={studentId} onChange={handleStudentIdChange} />
                <Link to={`/studentDetails/${studentId}`}><button onClick={fetchProfile}>Fetch Profile</button></Link>
            </div>


        </div>
    );
};

export default Student;
