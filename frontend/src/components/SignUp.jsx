import React, { useState, useContext } from 'react';
import { authStyles as styles } from '../assets/dummystyle';
import { UserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper.js';
import axiosInstance from '../utils/axiosInstance.js';
import { API_PATHS } from '../utils/apiPaths.js';
import { Input } from './Inputs.jsx';

const SignUp = ({ setCurrentPage }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handSignUp = async (e) => {
        e.preventDefault();
        if (!fullName) {
            setError('Please enter Full Name');
            return;
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid Email address');
            return;
        }
        if (!password) {
            setError('Please enter Password');
            return;
        }
        setError('');

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password,
            });
            const { token } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                updateUser(response.data);
                navigate('/dashboard');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong, please try again later');
        }
    };

    return (
        <div className={styles.signupContainer}>
            <div className={styles.headerWrapper}>
                <h3 className={styles.signupTitle}>Create Account</h3>
                <p className={styles.signupSubtitle}>Join thousands of professionals today</p>
            </div>

            <form onSubmit={handSignUp} className={styles.signupForm}>
                <Input
                    type="text"
                    value={fullName}
                    onChange={({ target }) => setFullName(target.value)}
                    label="Full Name"
                    placeholder="John Doe"
                />

                <Input
                    type="email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    label="Email"
                    placeholder="john.doe@example.com"
                />

                <Input
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    label="Password"
                    placeholder="Minimum 8 characters"
                />

                {error && <div className={styles.errorMessage}>{error}</div>}

                <button className={styles.signupSubmit} type="submit">
                    Create Account
                </button>

                <p className={styles.switchText}>
                    Already have an account?{' '}
                    <button onClick={() => setCurrentPage('login')} type="button" className={styles.signupSwitchButton}>
                        Sign In
                    </button>
                </p>
            </form>
        </div>
    );
};


export default SignUp;
