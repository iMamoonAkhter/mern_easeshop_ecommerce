import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateProduct({ categories }) {
    const [formValues, setFormValues] = useState({
        id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: null
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [fetchedCategories, setFetchedCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products/categories");
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setFetchedCategories(data);
            } else {
                throw new Error("Failed to fetch categories");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleFileChange = (event) => {
        setFormValues({
            ...formValues,
            image: event.target.files[0]
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();

        const { title, price, description, category, image } = formValues;

        if ( !title || !price || !description || !category || !image) {
            alert("All fields are required");
            return;
        }

        const imageUrl = typeof image === "string" ? image : URL.createObjectURL(image);

        const productData = {
            title,
            price: parseFloat(price),
            description,
            image: imageUrl,
            category
        };

        try {
            const response = await fetch("https://fakestoreapi.com/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Product created:", data); // Log the created product data
                navigate("/admin/products"); // Navigate to the product list on success
            } else if (response.status === 400) {
                setValidationErrors(data);
            } else {
                alert("Unable to create product");
            }
        } catch (error) {
            alert("Unable to connect to the server!");
        }
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Create Product</h2>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input 
                                    className="form-control" 
                                    name="title" 
                                    value={formValues.title} 
                                    onChange={handleInputChange} 
                                />
                                <span className="text-danger">{validationErrors.title}</span>
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
                                    value={formValues.price} 
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
                                    value={formValues.description} 
                                    onChange={handleInputChange}
                                ></textarea>
                                <span className="text-danger">{validationErrors.description}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select 
                                    className="form-select" 
                                    name="category" 
                                    value={formValues.category} 
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select category...</option>
                                    {fetchedCategories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                                <span className="text-danger">{validationErrors.category}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Image</label>
                            <div className="col-sm-8">
                                <input 
                                    className="form-control" 
                                    type="file" 
                                    name="image" 
                                    onChange={handleFileChange} 
                                />
                                <span className="text-danger">{validationErrors.image}</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link className="btn btn-secondary" to="/admin/products" role="button">Cancel</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
