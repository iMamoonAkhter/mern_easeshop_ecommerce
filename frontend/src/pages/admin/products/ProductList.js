import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "./useProducts";
import { useCart } from "./useCart"; // Import the useCart hook

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState({ column: "id", orderBy: "desc" });

    const { productss, isLoading, isError } = useProducts(); // Assuming useProducts fetches products

    const { addToCart } = useCart(); // Access addToCart function from useCart hook

    useEffect(() => {
        if (!isLoading && !isError) {
            setProducts(productss);
        }
    }, [productss, isLoading, isError]);

    useEffect(() => {
        filterAndSortProducts();
    }, [searchTerm, sortColumn, products]);

    function getProducts() {
        const url = "https://fakestoreapi.com/products";

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                alert("Unable to get products");
            });
    }

    function filterAndSortProducts() {
        let filtered = products;

        if (searchTerm) {
            filtered = products.filter(
                (product) =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filtered.sort((a, b) => {
            if (sortColumn.orderBy === "asc") {
                return a[sortColumn.column] > b[sortColumn.column] ? 1 : -1;
            } else {
                return a[sortColumn.column] < b[sortColumn.column] ? 1 : -1;
            }
        });

        setFilteredProducts(filtered);
    }

    function handleSearch(event) {
        event.preventDefault();
        const searchText = event.target.search.value;
        setSearchTerm(searchText);
    }

    function sortTable(column) {
        let orderBy = "desc";
        if (column === sortColumn.column) {
            orderBy = sortColumn.orderBy === "asc" ? "desc" : "asc";
        }
        setSortColumn({ column, orderBy });
    }

    function handleDelete(productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    setProducts(products.filter((product) => product.id !== productId));
                } else {
                    throw new Error();
                }
            })
            .catch((error) => {
                alert("Unable to delete product");
            });
    }

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Products</h2>

            <div className="row mb-3">
                <div className="col">
                    <Link
                        to="/admin/products/create"
                        className="btn btn-primary me-1"
                        role="button"
                    >
                        Create Product
                    </Link>
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={getProducts}
                    >
                        Refresh
                    </button>
                </div>
                <div className="col">
                    <form className="d-flex" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            name="search"
                        />
                        <button className="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => sortTable("id")}
                        >
                            ID{" "}
                            <SortArrow
                                column="id"
                                sortColumn={sortColumn.column}
                                orderBy={sortColumn.orderBy}
                            />
                        </th>
                        <th
                            style={{ cursor: "pointer", width: "100px" }}
                            onClick={() => sortTable("title")}
                        >
                            Title{" "}
                            <SortArrow
                                column="title"
                                sortColumn={sortColumn.column}
                                orderBy={sortColumn.orderBy}
                            />
                        </th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => sortTable("category")}
                        >
                            Category{" "}
                            <SortArrow
                                column="category"
                                sortColumn={sortColumn.column}
                                orderBy={sortColumn.orderBy}
                            />
                        </th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => sortTable("price")}
                        >
                            Price{" "}
                            <SortArrow
                                column="price"
                                sortColumn={sortColumn.column}
                                orderBy={sortColumn.orderBy}
                            />
                        </th>
                        <th>Image</th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => sortTable("rating.rate")}
                        >
                            Rate{" "}
                            <SortArrow
                                column="rating.rate"
                                sortColumn={sortColumn.column}
                                orderBy={sortColumn.orderBy}
                            />
                        </th>
                        <th
                            style={{ cursor: "pointer" }}
                            onClick={() => sortTable("rating.count")}
                        >
                            Quantity{" "}
                            <SortArrow
                                column="rating.count"
                                sortColumn={sortColumn.column}
                                orderBy={sortColumn.orderBy}
                            />
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product, index) => (
                        <tr key={index}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.category}</td>
                            <td>{product.price}$</td>
                            <td>
                                <img
                                    src={product.image}
                                    width="100"
                                    alt="..."
                                    className="img-fluid"
                                />
                            </td>
                            <td>{product.rating.rate}</td>
                            <td>{product.rating.count}</td>
                            <td style={{ width: "0.7vw", whiteSpace: "nowrap" }}>
                                <Link
                                    className="btn btn-primary btn-sm me-1"
                                    to={`/admin/products/edit/${product.id}`}
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm me-1"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function SortArrow({ column, sortColumn, orderBy }) {
    if (column !== sortColumn) return null;
    return orderBy === "asc" ? (
        <i className="bi bi-arrow-up"></i>
    ) : (
        <i className="bi bi-arrow-down"></i>
    );
}
