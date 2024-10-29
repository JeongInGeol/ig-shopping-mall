// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';

const SIGNUP_URL = '/api/users/signup';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(SIGNUP_URL, {
                email: email,
                password: password,
                name: name,
                username: email.split('@')[0]
            });
            console.log('Sign Up Success:', response.data);
        } catch (error) {
            console.error('Sign Up Error:', error);
            const errorMessage = error.response ? error.response.data : 'An unexpected error occurred';
            alert(`Error: ${errorMessage}`);
        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>이름: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
