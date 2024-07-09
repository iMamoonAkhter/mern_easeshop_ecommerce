import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
    const params = useParams();
    const navigate = useNavigate();

    // State to manage form data and validation errors
    const [formData, setFormData] = useState({
        title: "",
        category: "Other",
        price: "",
        description: "",
        image: ""
    });
    const [validationErrors, setValidationErrors] = useState({});

    // State to manage initial data retrieval
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        // Fetch initial data when component mounts
        fetch("https://fakestoreapi.com/products/" + params.id)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error();
            })
            .then(data => {
                // Store initial data and populate form
                setInitialData(data);
                setFormData({
                    title: data.title,
                    category: data.category,
                    price: data.price.toString(),
                    description: data.description,
                    image: data.image
                });
            }).catch(error => {
                alert("Unable to read the product details");
            });
    }, [params.id]);

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const { title, category, price, description, image } = formData;

        // Basic client-side validation
        if (!title || !category || !price || !description || !image) {
            alert("All fields are required");
            return;
        }

        // Prepare form data for submission
        const updatedData = {
            title,
            price: parseFloat(price),
            description,
            image,
            category
        };

        try {
            const response = await fetch("https://fakestoreapi.com/products/" + params.id, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            const data = await response.json();

            if (response.ok) {
                // Product updated successfully, navigate to products list
                navigate("/admin/products");
            } else if (response.status === 400) {
                // Validation errors from server
                setValidationErrors(data);
            } else {
                // Other errors
                alert("Unable to update the product");
            }
        } catch (error) {
            // Network or server error
            alert("Unable to connect to the server!");
        }
    };

    if (!initialData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Edit Product</h2>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">ID</label>
                            <div className="col-sm-8">
                                <input className="form-control-plaintext" readOnly defaultValue={params.id} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Title</label>
                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                />
                                <span className="text-danger">{validationErrors.title}</span>
                            </div>
                        </div>

                        

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select
                                    className="form-select"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="Other">Other</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="jewelery">Jewelery</option>
                                    <option value="men's clothing">Men's Clothing</option>
                                    <option value="women's clothing">Women's Clothing</option>
                                </select>
                                <span className="text-danger">{validationErrors.category}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Price</label>
                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    min="1"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                />
                                <span className="text-danger">{validationErrors.price}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8">
                                <textarea
                                    className="form-control"
                                    name="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                ></textarea>
                                <span className="text-danger">{validationErrors.description}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="offset-sm-4 col-sm-4">
                                <img src={initialData.image} width="150" alt="Product" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Image URL</label>
                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                />
                                <span className="text-danger">{validationErrors.image}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link className="btn btn-secondary" to="/admin/products" role="button">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
