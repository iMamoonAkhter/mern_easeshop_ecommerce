import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./admin/products/useCart"; // Adjust the path as per your project structure
import { useProducts } from "./admin/products/useProducts"; // Adjust the path as per your project structure
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';


export default function Home() {
    const { addToCart } = useCart(); // Using cart related functions and state
    const { products: fetchedProducts, fetchProducts } = useProducts(); // Fetching products using useProducts hook
    const [fetchedCategories, setFetchedCategories] = useState([]);
    const [products, setProducts] = useState([]); // Initialize as an empty array
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Number of items to show per page
    const [filterParams, setFilterParams] = useState({ category: "" });
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [filterParams, currentPage]);

    const fetchCategories = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products/categories");
            if (response.ok) {
                let data = await response.json();
                setFetchedCategories(data);
            } else {
                throw new Error("Failed to fetch categories");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Calculate current items to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem); // Add a check here

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total pages
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setFilterParams({ ...filterParams, category: category === "All Categories" ? "" : category });
        setCurrentPage(1); // Reset to first page
    };

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    return (
        <>
            <div style={{ backgroundColor: "#FFC107", minHeight: "200px" }}>
                <div className="container text-white py-5">
                    <div className="row align-items-center g-5">
                        <div className="col-md-6">
                            <h1 className="mb-5 display-2"><strong>ShopEase - Your One-Stop Online Shopping Destination</strong></h1>
                            <p>Discover unbeatable deals on top-quality products, from electronics to fashion, at ShopEase where convenience meets affordability.</p>
                        </div>
                        <div className="col-md-6 text-center">
                            <img src="/images/hero.png" width="300" className="img-fluid" alt="hero" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-light">
                <div className="container py-5">
                    <div className="row mb-5 g-2">
                        <div className="col-md-6">
                            <h4>Products</h4>
                        </div>
                        
                        <div className="col-md-3">
                            <select className="form-select" onChange={handleCategoryChange}>
                                <option value="All Categories" selected>All Categories</option>
                                {fetchedCategories.map((data) => (
                                    <option key={data} value={data}>{data}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select">
                                <option value="0">Order By Newest</option>
                                <option value="1">Price: Low to High</option>
                                <option value="2">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-5 g-3">
                        {currentItems.map((product) => (
                            <div key={product.id} className="col-md-3 col-sm-6">
                                <ProductItem product={product} addToCart={addToCart} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <nav>
                        <ul className="pagination justify-content-center">
                            {[...Array(totalPages).keys()].map((page) => (
                                <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                                    <button onClick={() => handlePageChange(page + 1)} className="page-link">
                                        {page + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            <div>
                <h1>Welcome {loggedInUser}</h1>
                <button onClick={handleLogout}>Logout</button>
                <div>
                    {
                        fetchedProducts && fetchedProducts?.map((item, index) => (
                            <ul key={index}>
                                <span>{item.name} : {item.price}</span>
                            </ul>
                        ))
                    }
                </div>
                <ToastContainer />
            </div>
        </>
    );
}


function ProductItem({ product, addToCart }) {
    if (!product) {
        return null; // Return null if product is undefined
    }

    console.log("Product data:", JSON.stringify(product, null, 2)); // Log the product object for inspection

    return (
        <div className="rounded border shadow p-4 text-center h-100">
            <img src={product.image} className="img-fluid" alt="..." style={{ height: "15vw", objectFit: "contain" }} />
            <hr />
            <h5 className="py-4">{product.title}</h5>
            <p>
                Category: {product.category}<br />
                {product.description.slice(0, 50) + "..."} <br />
                Rating: <i className="bi bi-star-fill"></i>{product.rating.rate}/5.0
            </p>
            <p className="mb-2">Price: ${product.price}</p>
            <button className="btn btn-outline-primary btn-sm m-2" onClick={() => addToCart(product)}>
                Add to Cart
            </button>
            <Link className="btn btn-outline-primary btn-sm m-2" to={"/products/" + product.id} role="button">Details</Link>
        </div>
    );
}
