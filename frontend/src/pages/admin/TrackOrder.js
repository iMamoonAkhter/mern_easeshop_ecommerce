import { Link } from "react-router-dom";


export default function TrackOrder(){

    let checkout = localStorage.getItem("checkout");
    let check = JSON.parse(checkout);
    
    return (
        <div className="container my-4">
            <h4 className="text-center">Track Users Order</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        check.map((track, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{track.firstname + track.lastname}</td>
                                <td>{track.email}</td>
                                <td>{track.phone}</td>
                                <td>{track.address}</td>
                                <td><Link to={`/admin/track/${index}`} className="text-center" role="button"><span className="badge text-bg-success "> Details </span></Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}