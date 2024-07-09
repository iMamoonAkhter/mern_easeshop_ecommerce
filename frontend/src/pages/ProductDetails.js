import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "./admin/products/useCart";
import { useProducts } from "./admin/products/useProducts";

export default function ProductDetails() {
    const params = useParams();
    const [product, setProduct] = useState({});
    const { addToCart } = useCart();
    const { productss, isLoading, isError } = useProducts();
    useEffect(() => {
        async function getProductDetails() {
            try {
                let response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
                if (response.ok) {
                    let data = await response.json();
                    setProduct(data);
                } else {
                    alert("Unable to get the product details");
                }
            } catch (error) {
                alert("Unable to connect to the server");
            }
        }

        getProductDetails();
    }, [params.id]);

    // Handle loading state if productss is not ready
    if (isLoading) return <div>Loading...</div>;
   
    // Handle error state if productss fetching failed
    if (isError) return <div>Error: {isError.message}</div>;

    // Find the product with the matching id from productss
    const productToShow = productss.find(p => p.id === parseInt(params.id));

    if (!productToShow) return <div>Product not found</div>;

    return (
        <div className="container my-4" style={{padding: "0 0 19vw 0"}}>
        <div className="row">
            <div className="col-md-4 text-center">
                <img src={product.image} width="200" alt={product.title} />
            </div>
            <div className="col-md-8">
                <h3 className="mb-3">{product.title}</h3>
                <h3 className="mb-3">${product.price}</h3>
                <button type="button" className="btn btn-warning btn-sm" onClick={() => addToCart(product)}>
                    Add to Cart <i className="bi bi-cart4"></i>
                </button>
                <hr />
                <div className="row mb-3">
                    <div className="col-sm-3 fw-bold">Category</div>
                    <div className="col-sm-9">{product.category}</div>
                </div>
                <div className="fw-bold">Description</div>
                <div style={{ whiteSpace: "pre-line" }}>{product.description}</div>
            </div>
        </div>
    </div>
    );
}
