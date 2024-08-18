import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[!@#$%^&*])/;

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
            const response = await axios.post('/login', { email, password });
            localStorage.setItem('username', response.data.user_id);
            navigate('/home');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
