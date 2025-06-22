import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './Products.css'
import { toast } from 'react-toastify';

const Products = ({ category, limit }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const userid = localStorage.getItem("userid")
    const [quantities, setQuantities] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.post("https://craftnest-backend-v5ki.onrender.com/api/product/listproduct")
            if (response.data.success) {
                setProducts(response.data.data)
                const initialQuantities = {}
                response.data.data.forEach(product => {
                    initialQuantities[product._id] = 1
                })
                setQuantities(initialQuantities)
            }
        }
        fetchProducts()
    }, [])

    // Filter products when category changes
    useEffect(() => {
        if (category === "All") {
            setFilteredProducts(products)
        } else {
            setFilteredProducts(products.filter(product => product.category === category))
        }
    }, [category, products])

    // Apply the limit to the filtered products
    const displayedProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

    const onchangeHandler = (e, productId) => {
        const value = Math.max(1, Math.min(Number(e.target.value), products.find(p => p._id === productId).stock))
        setQuantities(prev => ({
            ...prev,
            [productId]: value
        }))
    }

    const onsubmit = async (e, item) => {
        e.preventDefault()
        const response = await axios.post("https://craftnest-backend-v5ki.onrender.com/api/cart/addtocart", {
            user_id: userid,
            quantity: quantities[item._id],
            product_id: item._id,
            name: item.name,
            image: item.image,
            seller_id: item.seller_id,
            product_detail: item.product_detail
        })
        if (response.data.success) {
            toast.success(response.data.message)
        }
    }

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className='products-grid'>
            {displayedProducts.map((item, index) => (
                <div key={item._id} className='product-card' onClick={() => handleProductClick(item._id)} style={{ cursor: 'pointer' }}>
                    <div className='user-product-image'>
                        <img src={"https://craftnest-backend-v5ki.onrender.com/images/" + item.image} alt={item.name} />
                        {item.stock > 10 ? (
                            <span className='stock-high'>In Stock</span>
                        ) : (
                            <span className='stock-low'>Only {item.stock} left</span>
                        )}
                    </div>
                    <div className='product-content'>
                        <h3 className='product-name'>{item.name}</h3>
                        <p className='product-price'>₹{item.price}</p>
                        <p className='product-description'>{item.product_detail}</p>
                        
                        <div className='divider'></div>
                        <div onClick={(e) => e.stopPropagation()}>
                            <form onSubmit={(e) => onsubmit(e, item)} className='add-to-cart-form'>
                                <input
                                    onChange={(e) => onchangeHandler(e, item._id)}
                                    value={quantities[item._id] || 1}
                                    className='quantity-input'
                                    type='number'
                                    name='quantity'
                                    min="1"
                                    max={item.stock}
                                />
                                <button type='submit' className='add-to-cart-btn'>
                                    Add to Cart
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Products
