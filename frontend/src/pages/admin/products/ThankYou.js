import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
    const [show, setShow] = useState(false);
    let success = "/images/success.gif";
    let thankyou = "/images/Thankyou.gif";
    let rider = "/images/Rider.gif";
    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 3000);
    }, []);

    return (
        <>
            {show === false ? (
                <div className='container d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
                    <div className='text-center'>
                        <img src={success} width="40%" alt='success.gif' />
                        <p className='mt-3'>Please wait! Your order is in progress.</p>
                    </div>
                </div>
            ) : (
                <div className="container my-4">
                    <div className="text-center mb-4">
                        <img src={thankyou} width="20%" alt='thankyou.gif' />
                    </div>
                    <div>
                        <h1 className="text-center">Thank you for your order!</h1>
                        <p className="text-center">Your order has been successfully placed. You will receive a confirmation email shortly.</p>
                        <div className="text-center">
                            <Link to="/" className="btn btn-primary">Back to Home</Link>
                            <img src={rider} width="10%" alt='success.gif' />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
