import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Navbar, Footer } from './Components/layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProductList from './pages/admin/products/ProductList';
import CreateProduct from './pages/admin/products/CreateProduct';
import EditProduct from './pages/admin/products/EditProduct';
import ProductDetails from './pages/ProductDetails';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import { AppContext } from './AppContext';
import { AdminRoute, AuthenticatedUserRoute } from './Components/authorization';
import UserList from './pages/admin/users/UserList';
import UserDetails from './pages/admin/users/UserDetails';
import Cart from './pages/admin/products/Cart';
import { useCart } from './pages/admin/products/useCart';
import CheckOut from './pages/admin/products/CheckOut';
import ThankYou from './pages/admin/products/ThankYou';
import TrackOrder from './pages/admin/TrackOrder';
import TrackOrderDetails from './pages/admin/TrackOrderDetails';
import RefrshHandler from './RefrshHandler';

function MainApp() {
  const categories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];
  const [userCredentials, setUserCredentials] = useState(getStoredCredentials());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { items: cartItems } = useCart();

  function getStoredCredentials() {
    const storedCredentials = localStorage.getItem('userCredentials');
    return storedCredentials ? JSON.parse(storedCredentials) : null;
  }

  useEffect(() => {
    const str = JSON.stringify(userCredentials);
    localStorage.setItem('userCredentials', str);
  }, [userCredentials]);

  useEffect(() => {
    setIsAuthenticated(!!userCredentials);
  }, [userCredentials]);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  };

  return (
    <AppContext.Provider value={{ userCredentials, setUserCredentials }}>
      <BrowserRouter>
        <div className='d-flex flex-column min-vh-100'>
          <Navbar />
          <main className='flex-grow-1'>
            <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<PrivateRoute element={<Home />} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/profile" element={<AuthenticatedUserRoute><UserProfile /></AuthenticatedUserRoute>} />
              <Route path="/cart" element={<AuthenticatedUserRoute><Cart cartItems={cartItems} /></AuthenticatedUserRoute>} />
              <Route path="/register" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/products" element={<AdminRoute><ProductList /></AdminRoute>} />
              <Route path="/admin/track" element={<AdminRoute><TrackOrder /></AdminRoute>} />
              <Route path="/admin/track/:id" element={<AdminRoute><TrackOrderDetails /></AdminRoute>} />
              <Route path="/admin/products/create" element={<AdminRoute><CreateProduct categories={categories} /></AdminRoute>} />
              <Route path="/admin/products/edit/:id" element={<AdminRoute><EditProduct /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><UserList /></AdminRoute>} />
              <Route path="/admin/users/details/:id" element={<AdminRoute><UserDetails /></AdminRoute>} />
              <Route path="/cart/checkout" element={<AuthenticatedUserRoute><CheckOut /></AuthenticatedUserRoute>} />
              <Route path="/cart/checkout/orderConfirmation" element={<AuthenticatedUserRoute><ThankYou /></AuthenticatedUserRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(
  
    <React.StrictMode>
      <MainApp />
    </React.StrictMode>
);

reportWebVitals();
