import React from "react";
import { useCart } from "./useCart";
import { Link, useNavigate } from "react-router-dom";

export default function CheckOut() {
    const user = JSON.parse(localStorage.getItem("userCredentials")) || {};
    const { firstname, lastname, email, phone, zipcode } = user;
    const navigate = useNavigate();
    const { cartItems, clearCart, saveCart } = useCart();

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    const calculateTotalQuantity = () => {
        return cartItems.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    };

    const totalPrice = calculateTotalPrice().toFixed(2);
    const totalQuantity = calculateTotalQuantity();

    const handleCheckOut = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newCheckoutData = {
            firstname: formData.get('firstname'),
            lastname: formData.get('lastname'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            tehsil: formData.get('tehsil'),
            district: formData.get('district'),
            zipcode: formData.get('zipcode'),
            totalItems: totalQuantity,
            totalPrice: totalPrice,
            cartItems: cartItems.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
            })),
        };

        let existingCheckouts = JSON.parse(localStorage.getItem('checkout')) || [];
        if (!Array.isArray(existingCheckouts)) {
            existingCheckouts = []; // Initialize as an array if it's not already
        }
        
        existingCheckouts.push(newCheckoutData);
        localStorage.setItem('checkout', JSON.stringify(existingCheckouts));

        clearCart();
        saveCart(email); // Save the cart to local storage
        navigate('/cart/checkout/orderConfirmation');
    };

    return (
        <div className="container my-4">
            {cartItems.length === 0 ? (
                <div>
                    <h2>Sorry! Your cart is empty</h2>
                    <Link to='/'>Back to Home</Link>
                </div>
            ) : (
                <div>
                    <h2>Check Out</h2>
                    <form className="form" onSubmit={handleCheckOut}>
                        <div className="row mb-3 text-center">
                            <label className="col-sm-2 col-form-label">First Name *</label>
                            <div className="col-sm-4">
                                <input className="form-control" name="firstname" defaultValue={firstname} required />
                            </div>
                        </div>
                        <div className="row mb-3 text-center">
                            <label className="col-sm-2 col-form-label">Last Name *</label>
                            <div className="col-sm-4">
                                <input className="form-control" name="lastname" defaultValue={lastname} required />
                            </div>
                        </div>
                        <div className="row mb-3 text-center">
                            <label className="col-sm-2 col-form-label">Email *</label>
                            <div className="col-sm-4">
                                <input className="form-control" name="email" type="email" defaultValue={email} required />
                            </div>
                        </div>
                        <div className="row mb-3 text-center">
                            <label className="col-sm-2 col-form-label">Contact *</label>
                            <div className="col-sm-4">
                                <input className="form-control" name="phone" type="text" defaultValue={phone} required />
                            </div>
                        </div>
                        <div className="row mb-3 text-center">
                            <label className="col-sm-2 col-form-label">Address *</label>
                            <div className="col-sm-4">
                                <input className="form-control" name="address" type="text" required />
                            </div>
                        </div>
                        <div className="row mb-3 text-center">
                            <label className="col-sm-2 col-form-label">Tehsil *</label>
                            <div className="col-sm-4">
                                <input className="form-control" name="tehsil" type="text" required />
                            </div>
                        </div>
                        <div className="row mb-3 text-center">
                            <label className="col-sm-2 col-form-label">District *</label>
                            <div className="col-sm-4">
                                <input className="form-control" name="district" type="text" required />
                            </div>
                        </div>
                        <div className="row mb-3 text-center">
                            <label className="col-sm-2 col-form-label">Zipcode *</label>
                            <div className="col-sm-4">
                                <input className="form-control" name="zipcode" type="text" defaultValue={zipcode} required />
                            </div>
                        </div>
                        <div className="text-end mt-3">
                            <h5>Total Items: {totalQuantity}</h5>
                            <h5>Total Price: ${totalPrice}</h5>
                            <p>Delivery Estimated Days: 5-7 days</p>
                            <button className="btn btn-outline-primary btn-sm me-2" type="submit">Check Out</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
