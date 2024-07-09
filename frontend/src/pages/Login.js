import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    };

const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
        return handleError('Email and password are required');
    }
    try {
        const url = `https://mern-easeshop-ecommerce.vercel.app/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });
        const result = await response.json();
        console.log("Login API Response:", result); // Log the response for debugging
        const { success, message, jwtToken, name, error } = result;
        if (success) {
            handleSuccess(message);
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('loggedInUser', name);
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } else if (error) {
            const details = error?.details[0]?.message;
            handleError(details);
        } else {
            handleError(message); // Handle other possible error scenarios
        }
    } catch (err) {
        console.error("Login API Error:", err); // Log fetch request errors
        handleError(err.message);
    }
};


    return (
        <div className='container my-4'>
            <div className='row'>
                <div className='col-lg-6 mx-auto rounded border p-4'>
                    <h1 className='text-center mb-4'>Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input
                                onChange={handleChange}
                                type='email'
                                name='email'
                                className='form-control'
                                placeholder='Enter your email...'
                                value={loginInfo.email}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <input
                                onChange={handleChange}
                                type='password'
                                name='password'
                                className='form-control'
                                placeholder='Enter your password...'
                                value={loginInfo.password}
                            />
                        </div>
                        <div className='d-grid gap-2'>
                            <button type='submit' className='btn btn-primary'>Login</button>
                        </div>
                    </form>
                    <hr />
                    <p className='text-center'>OR</p>
                    <hr />
                    <p className="mt-3 text-center">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default Login;
