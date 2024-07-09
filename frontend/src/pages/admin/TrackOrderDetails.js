import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function TrackOrderDetails() {
    const { id } = useParams();
    let checkout = localStorage.getItem("checkout");
    let check = JSON.parse(checkout);
    const order = check[id];

    useEffect(() => {
        document.getElementById('order-details').classList.add('fade-in');
    }, []);

    if (!order) {
        return <div className="container my-4">Order not found</div>;
    }

    return (
        <div className="container my-4" id="order-details">
            <h2 className="text-center mb-4">Order Details</h2>
            <div className="card shadow p-4 mb-4">
                <h4>Full Name: {`${order.firstname} ${order.lastname}`}</h4>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Contact:</strong> {order.phone}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Tehsil:</strong> {order.tehsil}</p>
                <p><strong>District:</strong> {order.district}</p>
                <p><strong>Zipcode:</strong> {order.zipcode}</p>
                <h5>Total Items: {order.totalItems}</h5>
                <h5>Total Price: ${order.totalPrice}</h5>
                <h4>Items:</h4>
                <ul className="list-group">
                    {order.cartItems.map((item, index) => (
                        <li key={index} className="list-group-item">
                            <div className="d-flex justify-content-between">
                                <div>{item.title}</div>
                                <div>${item.price} x {item.quantity}</div>
                            </div>
                        </li>
                    ))}
                </ul>
                <Link className='text-center' to='/admin/track'>Back to Track Page</Link>
            </div>
        </div>
    );
}
