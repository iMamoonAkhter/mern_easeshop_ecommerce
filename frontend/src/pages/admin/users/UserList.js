import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../AppContext";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [ UserLists, setUserList ] = useState([]);
    const navigate = useNavigate();
    

    async function getUser() {
        try {
            const response = await fetch("https://fakestoreapi.com/users/");
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setUsers(data);
                setUserList(data);
            }
            else if(response === 401){
                alert("Response 401");
                navigate("/")
            }
            else {
                throw new Error('Unable to get Users');
            }
        } catch (error) {
            console.log("Unable to connect to the server");
            alert("Unable to get User");
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="container my-4">
            <h2 className="text-center mb-5">List of Users</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        UserLists.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name.firstname}</td>
                                <td>{user.name.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.role === "admin" ? <span className="badge text-bg-warning">Admin</span> : <span className="badge text-bg-success">Client</span>}</td>
                                <td>
                                    <Link role="button" to={`/admin/users/details/${user.id}`} className="btn btn-primary btn-sm">Details</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
