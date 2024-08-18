import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[!@#$%^&*])/;

        if (!name) {
            errors.name = 'Name is required.';
        }

        if (!email || !emailPattern.test(email)) {
            errors.email = 'Please enter a valid email address.';
        }

        if (!password || password.length < 8 || !passwordPattern.test(password)) {
            errors.password = 'Password must be at least 8 characters long and include at least one special character.';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.post('/register', { name, email, password });
            navigate('/login');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
