import React from 'react'
import { Input } from './Inputs'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance.js'
import { API_PATHS } from '../utils/apiPaths'


// const CreateResumeForm = () => {

//     const [title, setTitle] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleCreateResume = async (e) => {
//         e.preventDefault();

//         if (!title) {
//             setError("please enter resume title.");
//             return;
//         }
//         setError('');

//         try {
//             const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, { title });

//             if (response.data?._id) {
//                 if (onSuccess) onSuccess();  // ✅ This is what was missing
//                 navigate(/resume/${response.data._id});
//             }
//         }
//         catch (error) {
//             if (error.response && error.response.data.message) {
//                 setError(error.response.data.message);
//             }
//             else {
//                 setError('something went wrong. Please try again later.');
//             }
//         }
//     }

const CreateResumeForm = ({ onSuccess }) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current?.focus(); // Automatically focus the input
    }, []);

    const handleCreateResume = async (e) => {
        e.preventDefault();

        if (!title) {
            setError("please enter resume title.");
            return;
        }

        setError('');

        try {
            const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, { title });
            console.log("API call success ✅", response.data);

            const newResume = response.data?.newResume;
            if (newResume?._id) {
                // console.log("onSuccess should run now");
                if (onSuccess) {
                    onSuccess();
                }
                // Removed navigation to /resume/:id to stay on dashboard
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <div className='w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-100'>
            <h3 className='text-2xl font-bold text-gray-900 mb-2'>Create New Resume</h3>
            <p className='text-gray-600 mb-8'>
                Give your resume a title to get started. You can customize everything later.
            </p>

            <form onSubmit={handleCreateResume}>
                <Input
                    ref={inputRef}
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    label="Resume Title"
                    placeholder="e.g., John Doe - Software Engineer"
                    type="text"
                    
                />

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                    type="submit"  // ✅ This is important!
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-black rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-rose-200 transition-all"
                >
                    Create Resume
                </button>
            </form>
        </div>
    )
}

export default CreateResumeForm
