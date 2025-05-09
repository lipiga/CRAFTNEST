import React from 'react'
import SellerHeader from '../../Components/Seller/SellerHeader'
import SellerProduct from '../../Components/SellerProduct/SellerProduct'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

const SellerPage = () => {
  return (
    <div>
        <ToastContainer />
        <SellerHeader />
        <SellerProduct />
    </div>
  )
}

export default SellerPage