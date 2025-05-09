import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerHeader.css';

const SellerHeader = () => {
  const [sellermenu, setSellermenu] = useState("myproducts");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  
  const sellerDetails = JSON.parse(localStorage.getItem("sellerdetails"));
  const profileImage = sellerDetails?.image 
    ? `http://localhost:4000/images/${sellerDetails.image}`
    : 'default-profile.png';

  const handleLogout = () => {
    localStorage.removeItem("sellerid");
    localStorage.removeItem("sellerdetails");
    navigate('/');
  };

  return (
    <div className='seller-header-container'>
      <div className='seller-nav'>
        <h1>Dashboard</h1>
        <ul className='seller-nav-list'>
          <li 
            className={sellermenu === "myproducts" ? 'active' : ''} 
            onClick={() => { setSellermenu("myproducts"); navigate("/seller") }}
          >
            My Products
          </li>
          <li 
            className={sellermenu === "addproducts" ? 'active' : ''} 
            onClick={() => { setSellermenu("addproducts"); navigate("/addproducts") }}
          >
            Add Products
          </li>
          <li 
            className={sellermenu === "orders" ? 'active' : ''} 
            onClick={() => { setSellermenu("orders"); navigate('/sellerorder')}}
          >
            Orders
          </li>
        </ul>
        
        <div className='seller-profile-section'>
          <div 
            className='seller-profile-pic'
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img 
              src={profileImage} 
              alt="Profile" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'default-profile.png';
              }}
            />
          </div>
          
          {showProfileMenu && (
            <ul className='seller-profile-dropdown'>
              <li className='seller-profile-info'>
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'default-profile.png';
                  }}
                />
                <span>{sellerDetails?.name || 'Seller'}</span>
              </li>
              <li onClick={() => navigate('/seller/profile')}>Profile</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerHeader;