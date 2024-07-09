import React from "react";
import { useCart } from "./useCart";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Cart({userEmail}) {
    let { cartItems, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCart();
    
    let calculateTotalPrice = ()=> {
        return cartItems.reduce((total, item)=> {
            return total + (item.price*item.quantity)
        }, 0);
    };

    let calculateTotalQuantity = ()=> {
        return cartItems.reduce((total, item)=> {
            return total + item.quantity
        }, 0);
    };

    let handleIncrement = (productId) => {
        incrementQuantity(productId);
    };

    let handleDecrement = (productId) => {
        decrementQuantity(productId);
    };

    const handleRemove = (productId) => {
        removeFromCart(productId, userEmail);
    };

    const handleClearCart = ()=>{
        clearCart(userEmail);
    };

    let totalPrice = calculateTotalPrice().toFixed(2);

    return (
        <div className="container my-4">
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><img src={item.image} width="30px" alt={item.title} /></td>
                                    <td>{item.title}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary ms-1" onClick={() => handleIncrement(item.id)}>+</button>
                                        {item.quantity}
                                        <button className="btn btn-sm btn-primary ms-1" onClick={() => handleDecrement(item.id)}>-</button>
                                    </td>
                                    <td>${item.price}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="text-end">
                        <h5>Total Price: ${totalPrice}</h5>
                    </div>

                    <hr />
                    <TotalCost totalPrice={totalPrice} calculateTotalQuantity={calculateTotalQuantity()} handleClearCart={handleClearCart} />
                </>
            )}
            
            <div className="text-end mt-3">
                {calculateTotalQuantity() !== 0 ? <Link className="btn btn-outline-primary btn-sm me-2" to="/cart/checkout">CheckOut</Link> : ""}
            </div>
        </div>
    );
}

function TotalCost(props){
    return (
        <>
            <table className="table">
                <tr>
                    <th className="col-md-1">Total Items: </th>
                    <td>{props.calculateTotalQuantity}</td>
                </tr>
            </table>

            
        </>
    )
}
