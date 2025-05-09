import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import axios from 'axios'
import './Cart.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const Cart = () => {
    const userid = localStorage.getItem("userid")
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()
    const fetchCart = async () => {
        const response = await axios.get("http://localhost:4000/api/cart/get", { headers: { 'user_id': userid } })
        if (response.data.success) {
            setCart(response.data.data)
            totalAmount()
        }
    }
    const totalAmount = () => {
        setTotal(cart.reduce((total, item) => total + item.price, 0))
    }
    fetchCart();
    const DeleteCart = async (cartId) => {
        const response = await axios.post("http://localhost:4000/api/cart/delete", { id: cartId })
        if (response.data.success) {
            toast.success(response.data.message)
            fetchCart();
        }
    }
    return (
        <div>
            <Navbar />
            <div className='cart-list'>
                {cart.map((item, index) => {
                    return (
                        <div key={index} className='wrapper'>
                            <p onClick={() => DeleteCart(item._id)} className='close'>X</p>
                            <div className='card'>
                                <img src={"http://localhost:4000/images/" + item.image} />
                                <p className='name'>{item.name}</p>
                                <p className='price'>Price for {item.quantity} Quantity : {item.price}</p>
                                <p className='qty'>Quantity: {item.quantity}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            {
                total === 0 ? <div className='checkout'>
                    <p className='total'>Your Cart is Empty</p>
                    <Link to='/' className='proceed'>Add products to your cart</Link>
                </div> :
                    <div className='checkout'>
                        <p className='total'>Total Cart Amount: {total}</p>
                        <Link to='/order' className='proceed'>Proceed to Checkout</Link>
                    </div>
            }
        </div>
    )
}
export default Cart