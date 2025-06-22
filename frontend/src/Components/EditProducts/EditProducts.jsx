import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProducts.css';
import SellerHeader from '../Seller/SellerHeader';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

const EditProducts = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({
        name: "",
        product_detail: "",
        price: "",
        stock: "",
        category: ""
    });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `https://craftnest-backend-v5ki.onrender.com/api/product/fetchproduct/${productId}`
                );
                if (response.data.success) {
                    setProduct({
                        name: response.data.data.name,
                        product_detail: response.data.data.product_detail,
                        price: response.data.data.price,
                        stock: response.data.data.stock,
                        category: response.data.data.category
                    });
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("product_id", productId);
            formData.append("name", product.name);
            formData.append("product_detail", product.product_detail);
            formData.append("price", product.price);
            formData.append("stock", product.stock);
            formData.append("category", product.category);
            
            if (image) {
                formData.append("image", image);
            }

            const response = await axios.post(
                "https://craftnest-backend-v5ki.onrender.com/api/product/updateproduct",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/seller');
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Error updating product");
        }
    };

    return (
        <div className="edit-products-wrapper">
            <ToastContainer />
            <SellerHeader />
            <div className="edit-products-container">
                <form className="edit-products-form" onSubmit={handleSubmit}>
                    <p className="edit-products-title">Edit Product Details</p>
                    <input
                        className="edit-products-input"
                        onChange={handleChange}
                        type="text"
                        name="name"
                        value={product.name}
                        required
                        placeholder="Product Name"
                    />
                    <textarea
                        className="edit-products-textarea"
                        onChange={handleChange}
                        rows={3}
                        name="product_detail"
                        value={product.product_detail}
                        required
                        placeholder="Product Description"
                    />
                    <input
                        className="edit-products-input"
                        onChange={handleChange}
                        type="number"
                        name="price"
                        value={product.price}
                        required
                        placeholder="Price"
                    />
                    <input
                        className="edit-products-input"
                        onChange={handleChange}
                        type="number"
                        name="stock"
                        value={product.stock}
                        required
                        placeholder="Stock Quantity"
                    />
                    <input
                        className="edit-products-file-input"
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        name="image"
                        accept="image/*"
                    />
                    <button className="edit-products-submit-btn" type="submit">
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProducts;
