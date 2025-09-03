import React from 'react'
import { authStyles as styles } from '../assets/dummystyle';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper.js';
import { Input } from './Inputs.jsx';
import { API_PATHS } from '../utils/apiPaths.js';
import axiosInstance from '../utils/axiosInstance.js';
// import { Dashboard } from './Dashboard.jsx';
import SignUp from './SignUp.jsx';

const Login = ({ setCurrentPage }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Please enter a valid Email address');
            return;
        }
        if (!password) {
            setError('Please enter Password');
            return;
        }
        
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });
            const { token } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                updateUser(response.data);
                navigate('/dashboard');
            }
        }
        catch (error) {
            setError(error.response?.data?.message || 'Something went wrong please try again later');
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.headerWrapper}>
                <h3 className={styles.title}>
                    Welcome Back
                </h3>
                <p className={styles.subtitle}>
                    Sign in to continue building amazing resumes
                </p>

                {/* form */}
                <form onSubmit={handleLogin} className={styles.form}>   
                    <Input
                        type="email"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email"
                        placeholder="skillsnap@gmail.com"
                    />

                    <Input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="min 8 characters"
                    />

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <button type='submit' className={styles.submitButton}>
                        Sign In
                    </button>

                    <p className={styles.switchText}>
                        Dont have an account?{' '}
                        <button type='button' onClick={() => setCurrentPage('signup')} className={styles.switchButton}>
                            Sign Up
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
