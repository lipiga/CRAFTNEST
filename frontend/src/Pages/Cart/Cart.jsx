import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext';

const Cart = () => {
  const userid = localStorage.getItem("userid");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get("https://craftnest-backend-v5ki.onrender.com/api/cart/get", {
        headers: { 'user_id': userid }
      });
      if (response.data.success) {
        setCart(response.data.data);

        calculateTotal(response.data.data); // pass data directly
      }
    } catch (err) {
      console.log(err);
    }
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.price, 0);
    setTotal(sum);
  };

  const DeleteCart = async (cartId) => {
    try {
      const response = await axios.post("https://craftnest-backend-v5ki.onrender.com/api/cart/delete", {
        id: cartId
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchCart(); // refresh cart immediately
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart-page">
      <ToastContainer />
      <div className="navbar-fullwidth">
        <Navbar />
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <p onClick={() => DeleteCart(item._id)} className="remove-item">X</p>
              <div className="item-details">
                <img 
                  src={`https://craftnest-backend-v5ki.onrender.com/images/${item.image}`} 
                  className="item-image" 
                  alt={item.name} 
                />
                <p className="item-name">{item.name}</p>
                <p className="item-price">Price for {item.quantity} Quantity: ₹{item.price}</p>
                <p className="item-quantity">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {total === 0 ? (
          <div className="cart-summary empty-cart">
            <p className="empty-title">Your Cart is Empty</p>
            <Link to='/' className="shop-link">Add products to your cart</Link>
          </div>
        ) : (
          <div className="cart-summary">
            <p className="total-amount">Total Cart Amount: ₹{total}</p>
            <div className="checkout-actions">
              <Link to='/' className="continue-btn">Continue Shopping</Link>
              <Link to='/order' className="checkout-btn">Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
