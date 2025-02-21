import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';
export function Navbar() {
    const { userCredentials, setUserCredentials } = useContext(AppContext);
    console.log(userCredentials);
    const navigate = useNavigate();
    function handleLogout() {
        setUserCredentials(null);
        localStorage.removeItem('userCredentials');
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src="/icon.png" alt="..." width="30" className="me-2" /> ShopEase Store
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-dark" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="/contact">Contact</Link>
                        </li>
                    </ul>
                    {
                        userCredentials && userCredentials.role === "admin" &&
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-dark" to="/admin" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/admin/products">Products</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/track">Track Orders</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/users">Users</Link></li>
                                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" onClick={handleLogout} to="/login">Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    }
                    <ToastContainer />
                    {
                        userCredentials && userCredentials.role !== "admin" &&
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-dark" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Client
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/cart">Cart</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" onClick={handleLogout} to="/login">Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    }
                    {
                        !userCredentials &&
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="btn btn-outline-primary me-2" to="/register" role="button">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-primary" to="/login" role="button">Login</Link>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    );
}

export function Footer() {
    return (
        <div className="text-center p-4 border-top mt-auto">
            <img src="/icon.png" alt="..." width="30" className="me-2" />
            ShopEase Ecommerce Store
        </div>
    );
}
