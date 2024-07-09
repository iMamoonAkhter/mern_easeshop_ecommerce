import {  useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UserDetails() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const params = useParams();

    async function getUser() {
        try {
            const response = await fetch("https://fakestoreapi.com/users/" + params.id);
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else if (response.status === 401) {
                setUser(null);
                navigate('/admin/users');
            } else {
                throw new Error('Unable to get User');
            }
        } catch (error) {
            console.log("Unable to connect to the server");
            alert("Unable to get User");
        }
    }

    useEffect(() => {
        getUser();
    }, [params.id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-4">
            <h2>User Details</h2>
            <div className="row mb-3">
                <div className="col-4">ID:</div>
                <div className="col-8">{user.id}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">First Name:</div>
                <div className="col-8">{user.name.firstname}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">Last Name:</div>
                <div className="col-8">{user.name.lastname}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">Email:</div>
                <div className="col-8">{user.email}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">Username:</div>
                <div className="col-8">{user.username}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">Contact No.:</div>
                <div className="col-8">{user.phone}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">Number:</div>
                <div className="col-8">{user.address.number}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">Street:</div>
                <div className="col-8">{user.address.street}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">City:</div>
                <div className="col-8">{user.address.city}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">Zipcode:</div>
                <div className="col-8">{user.address.zipcode}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">lat & long:</div>
                <div className="col-8">{user.address.geolocation.lat + " & " + user.address.geolocation.long}</div>
            </div>
            <hr />
            <Link role="button" className="btn btn-secondary btn-sm" to="/admin/users">Back to User List</Link>
        </div>
    );
}
