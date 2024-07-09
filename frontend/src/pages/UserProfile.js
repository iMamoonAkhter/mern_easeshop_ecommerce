import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { Link, useNavigate } from "react-router-dom";

export default function UserProfile() {
    const { userCredentials, setUserCredentials } = useContext(AppContext);
    console.log("User Profile: "+userCredentials);
    let img = "https://media.licdn.com/dms/image/D4E03AQHec7f_G2sYlQ/profile-displayphoto-shrink_800_800/0/1695287936267?e=1725494400&v=beta&t=08CYzd5fETGXmo38-jwYLC7kLMSCtpiC6LqWzdsSi-w"
    const [action, setAction] = useState("default");
    return (
        <div className="container my-4">
            <div className="row">
                {
                    action === "default" &&
                    <div className="col-lg-8 mx-auto rounded border p-4">
                        {userCredentials.role === "admin" && <img src={img} alt="..." className="rounded-circle d-block mx-auto mb-3" width="100" />}
                        <h2 className="mb-3">{userCredentials.role === "admin" ? "Admin Profile" : "User Profile"}</h2>
                        <hr />
                        <Details />
                        <hr />
                        <button className="btn btn-primary btn-sm me-2" onClick={() => setAction("update_profile")}>Update Profile</button>
                        <button className="btn btn-warning btn-sm" onClick={() => setAction("update_password")}>Update Password</button>
                    </div>
                }
                {
                    action === "update_profile" &&
                    <div className="col-lg-8 mx-auto rounded border p-4">
                        <h2 className="mb-3 text-center">Update Profile</h2>
                        <hr />
                        <UpdateProfile setAction={setAction} />
                        <hr />
                        <div className="text-center">
                            <button type="button" className="btn btn-link text-decoration-none" onClick={() => setAction("default")}>Back to Profile</button>
                        </div>
                    </div>
                }
                {
                    action === "update_password" &&
                    <div className="col-lg-5 col-md-5 mx-auto rounded border p-4" style={{margin: "0 0 10vw 0"}}>
                        <h2 className="mb-3 text-center">Update Password</h2>
                        <hr />
                        <UpdatePassword setAction={setAction} />
                        <hr />
                        <div className="text-center">
                            <button type="button" className="btn btn-link text-decoration-none" onClick={() => setAction("default")}>Back to Profile</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

function Details() {
    const { userCredentials } = useContext(AppContext);

    if (!userCredentials) {
        return <p>Loading...</p>;
    }

    const {
        id, firstname, lastname, email, username,
        phone, street, number, city, zipcode,
        lat, long, role
    } = userCredentials;

    return (
        <>
            <div className="row mb-3">
                <div className="col-sm-6">ID:</div>
                <div className="col-sm-6">{role === "admin" ? "17-6523412-048" : id}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-6">First Name: </div>
                <div className="col-sm-6">{role === "admin" ? "Mamoon" : firstname}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-6">Last Name: </div>
                <div className="col-sm-6">{role === "admin" ? "Akhter" : lastname}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-6">Email: </div>
                <div className="col-sm-6">{role === "admin" ? "hr@shopease.com" : email}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-6">Username: </div>
                <div className="col-sm-6">{role === "admin" ? "hrmamoon" : username}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-6">Phone: </div>
                <div className="col-sm-6">{role === "admin" ? "051-45232145" : phone}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-6">Street: </div>
                <div className="col-sm-6">{role === "admin" ? "B-2 Gulberg" : street}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-6">Number: </div>
                <div className="col-sm-6">{role === "admin" ? "1520" : number}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-6">City: </div>
                <div className="col-sm-6">{role === "admin" ? "Lahore, Pakistan" : city}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-6">Zip Code: </div>
                <div className="col-sm-6">{role === "admin" ? "51000" : zipcode}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-6">Lat: </div>
                <div className="col-sm-6">{role === "admin" ? "31.582045" : lat}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-6">Long: </div>
                <div className="col-sm-6">{role === "admin" ? "74.329376" : long}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-6">Role: </div>
                <div className="col-sm-6">{role === "admin" ? <span className="badge text-bg-warning">Admin</span> : <span className="badge text-bg-success">Client</span>}</div>
            </div>
        </>
    );
}


function UpdateProfile({ setAction }) {
    const navigate = useNavigate();
    const { userCredentials, setUserCredentials } = useContext(AppContext);
    const [formData, setFormData] = useState(userCredentials);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.firstname || !formData.lastname || !formData.email || !formData.username) {
            alert('Please fill all the required fields.');
            return;
        }

        setUserCredentials(formData);
        storeCredentialsInLocalStorage(formData);
        alert('Your Information has been updated.');
        setAction("default");
        navigate('/profile');
    };

    function storeCredentialsInLocalStorage(credentials) {
        localStorage.setItem('userCredentials', JSON.stringify(credentials));
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-8 mx-auto rounded border p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">First Name *</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="firstname" value={formData.firstname} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Last Name *</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="lastname" value={formData.lastname} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Email *</label>
                            <div className="col-sm-8">
                                <input className="form-control" type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Username *</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="username" value={formData.username} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Phone</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Street</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="street" value={formData.street} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Number</label>
                            <div className="col-sm-8">
                                <input className="form-control" type="number" name="number" value={formData.number} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">City</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="city" value={formData.city} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Zip Code</label>
                            <div className="col-sm-8">
                                <input className="form-control" type="number" name="zipcode" value={formData.zipcode} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Latitude</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="lat" value={formData.lat} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Longitude</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="long" value={formData.long} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button className="btn btn-primary" type="submit">
                                    Submit
                                </button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link className="btn btn-outline-primary" to="/profile" role="button">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}



function UpdatePassword({ setAction }) {
    const { userCredentials, setUserCredentials } = useContext(AppContext);
    const [formData, setFormData] = useState({
        password: "",
        confirm_password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { password, confirm_password } = formData;
        if (password !== confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        setUserCredentials(prevData => ({
            ...prevData,
            password: password
        }));

        storeCredentialsInLocalStorage({
            ...userCredentials,
            password
        });

        alert("Password updated successfully.");
        setAction("default");
        navigate("/profile");
    }

    const storeCredentialsInLocalStorage = (credentials) => {
        localStorage.setItem("userCredentials", JSON.stringify(credentials));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">New Password *</label>
                <input className="form-control" value={formData.password} onChange={handleChange} name="password" type="password" />
            </div>

            <div className="mb-3">
                <label className="form-label">Confirm Password *</label>
                <input className="form-control" value={formData.confirm_password} onChange={handleChange} name="confirm_password" type="password" />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="text-end">
                <button type="submit" className="btn btn-warning">Update Password</button>
            </div>
        </form>
    );
}
