import React, { useState } from 'react'
import './Navbar.css'
import { FaUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import {IoBag} from 'react-icons/io5'

const Navbar = ({setUsertype,setShowuserlogin }) => {
  const [line, setLine] = useState("")
  const navigae = useNavigate()
  
  const HandleProfileClick = (userId) =>{
    navigae(`/user/${userId}`);
  }
  

  return (
    <div className='navbar'>
        <div className='navbar-left'>
            <h1>CRAFT NEST</h1>
        </div>
        <div className='navbar-middle'>
            <ul>
          <li className={line === "home" ? 'active' : ""} onClick={() => { setLine("home") ; navigae('/')}}>Home</li>
          <li className={line === "products" ? 'active' : ""} onClick={() => {setLine("products"); navigae('/products')}}>Products</li>
          <li className={line === "contact" ? 'active' : ""} onClick={() => setLine("contact")}>Contact Us</li>
          <li className={line === "seller" ? 'active' : ""} onClick={() => { setLine("seller"); setShowuserlogin(true); setUsertype("seller") }}>Become a Seller</li>
            </ul>
        </div>
        <div className='navbar-right'>
        {!localStorage.getItem("userid") == "" ? <div className='icons'>
          <FaUser  className='icon' onClick={()=>HandleProfileClick(localStorage.getItem("userid"))} />
          <FaCartShopping onClick={() => navigae('/cart')} className='icon' />
          <TbLogout onClick={()=>{localStorage.removeItem("userid"); navigae('/')}} className='icon' />
          <IoBag onClick={()=>navigae('/userorder')} className='icon' />
                        </div> : 
        <button onClick={() => {setShowuserlogin(true); setUsertype("user")}} className='nav-btn'>Sign In</button>}
        
        </div>
    </div>
  )
}

export default Navbar