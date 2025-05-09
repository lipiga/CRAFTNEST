import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SellerHeader from '../Seller/SellerHeader';
import './SellerOrder.css';

const SellerOrder = () => {
    const sellerid = localStorage.getItem("sellerid");
    const [orderItem, setOrderitem] = useState([]);

    const GetUserOrder = async () => {
        const response = await axios.get("http://localhost:4000/api/order/getsellerorder", { 
            headers: { 'seller_id': sellerid } 
        });
        if (response.data.success) {
            setOrderitem(response.data.data);
        }
    };

    const updateOrderStatus = async (orderId, productId, newStatus) => {
        try {
            const response = await axios.put(
                `http://localhost:4000/api/order/updatestatus/${sellerid}`,
                { orderId, productId, status: newStatus }
            );
            if (response.data.success) {
                toast.success("Status updated!");
                GetUserOrder();
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    useEffect(() => {
        GetUserOrder();
    }, []);

    return (
        <div className="seller-order-container">
            <SellerHeader/>
            <div className="seller-order-header">
                <h2>Your Orders</h2>
            </div>
            
            <div className="seller-order-grid">
                <div className="seller-order-grid-header">
                    <div className="seller-order-col-product">Product</div>
                    <div className="seller-order-col-details">Details</div>
                    <div className="seller-order-col-qty">Qty</div>
                    <div className="seller-order-col-price">Price</div>
                    <div className="seller-order-col-payment">Payment</div>
                    <div className="seller-order-col-address">Address</div>
                    <div className="seller-order-col-status">Status</div>
                </div>
                
                {orderItem.map((order) => (
                    order.product
                        .filter(product => product.seller_id === sellerid)
                        .map((product) => (
                            <div key={`${order._id}-${product._id}`} className="seller-order-item">
                                <div className="seller-order-col-product">
                                    <img 
                                        src={`http://localhost:4000/images/${product.image}`} 
                                        alt={product.name}
                                        className="seller-order-product-image" 
                                    />
                                </div>
                                
                                <div className="seller-order-col-details">
                                    <div className="seller-order-product-name">{product.name}</div>
                                    <div className="seller-order-product-category">{product.category}</div>
                                </div>
                                
                                <div className="seller-order-col-qty">{product.quantity}</div>
                                
                                <div className="seller-order-col-price">₹{product.price}</div>
                                
                                <div className={`seller-order-col-payment ${product.paymentMethod.replace(/\s+/g, '-').toLowerCase()}`}>
                                    {product.paymentMethod}
                                    <div className={`seller-order-payment-status ${product.payment ? 'paid' : 'pending'}`}>
                                        {product.payment ? 'Paid' : 'Pending'}
                                    </div>
                                </div>
                                
                                <div className="seller-order-col-address">
                                    <div className="seller-order-customer-name">{order.username}</div>
                                    <div className="seller-order-customer-phone">📱 {order.phone}</div>
                                    <div className="seller-order-address-line">
                                        {order.doorno}, {order.street}
                                    </div>
                                    <div className="seller-order-address-line">
                                        {order.area}, {order.district}
                                    </div>
                                    <div className="seller-order-address-line">
                                        {order.state} - {order.pincode}
                                    </div>
                                </div>
                                
                                <div className="seller-order-col-status">
                                    <select
                                        value={product.status}
                                        onChange={(e) => updateOrderStatus(order._id, product._id, e.target.value)}
                                        className={`seller-order-status-select status-${product.status.toLowerCase().replace(/\s+/g, '-')}`}
                                    >
                                        <option value="In Progress">In Progress</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        ))
                ))}
            </div>
        </div>
    );
};

export default SellerOrder;