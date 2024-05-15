import React, { useState } from 'react';
import './Login.css'; // Ensure CSS file exists for styling
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const APP_URL = 'http://54.147.25.67:5000';

    const validateUsername = (username) => {
        const pattern = /^.+@[^.]+\.edu$/;
        return pattern.test(username);
    };

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        if (!role) {
            formIsValid = false;
            errors["role"] = "Please select a role.";
        }

        if (!username.trim()) {
            formIsValid = false;
            errors["username"] = "Username is required.";
        } else if (!validateUsername(username)) {
            formIsValid = false;
            errors["username"] = "Invalid UserName. Must be a .edu email.";
        }

        if (!password) {
            formIsValid = false;
            errors["password"] = "Password is required.";
        } else if (password.length < 6) {
            formIsValid = false;
            errors["password"] = "Password must be at least 6 characters.";
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${APP_URL}/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ role, username, password })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);

                // Store the token and redirect to the role-specific page
                localStorage.setItem('token', data.token);
                navigate(`/${role}`);
            } catch (error) {
                console.error("There was an error logging in!", error);
                setErrors({ ...errors, form: "Invalid login credentials" });
            }
        }
    };

    return (
        <div className="login-container">
            <h1 className="title">Learning Management System</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="input-group">
                    <label htmlFor="role">Role</label>
                    <select id="role" value={role} onChange={e => setRole(e.target.value)} required>
                        <option value="">Select Role</option>
                        <option value="faculty">Faculty</option>
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && <div className="error">{errors.role}</div>}
                </div>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    {errors.username && <div className="error">{errors.username}</div>}
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
                {errors.form && <div className="error">{errors.form}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
