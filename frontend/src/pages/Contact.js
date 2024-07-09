import React from "react";

const ContactCard = () => {
    return (
        <div className="container" style={{margin: "8vw 0 11vw 9vw"}}>
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-center bg-danger text-white p-2 mb-4">Contact Information</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Company's CEO:</strong> Mamoon Akhter</li>
                                <li className="list-group-item"><strong>Name of Company:</strong> ShopEase</li>
                                <li className="list-group-item"><strong>Company's Email:</strong> hr@shopease.com</li>
                                <li className="list-group-item"><strong>Headquarter:</strong> Islamabad, Pakistan</li>
                                <li className="list-group-item"><strong>Contact No:</strong> 051-65821460</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
