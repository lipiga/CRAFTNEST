import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfilePage.css';

const UserProfilePage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [cart, setCart] = useState([])
    const [orderItem, setOrderitem] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        image: null,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const GetUserOrder = async () => {
        const response = await axios.get("https://craftnest-backend-v5ki.onrender.com/api/order/getuserorder", { headers: { 'user_id': id } })
        if (response.data.success) {
            setOrderitem(response.data.data)
            setOrderstatus(true)
        } else {
            console.log("error")
        }
    }
    const fetchCart = async () => {
        const response = await axios.get("https://craftnest-backend-v5ki.onrender.com/api/cart/get", { headers: { 'user_id': id } })
        if (response.data.success) {
            setCart(response.data.data)
            totalAmount()
        }
    }

    useEffect(() => {

        
        const getUser = async () => {
            try {
                const response = await axios.get(`https://craftnest-backend-v5ki.onrender.com/api/user/getuser/${id}`);
                if (response.data.success) {
                    setUser(response.data.data);
                    setFormData(prev => ({
                        ...prev,
                        name: response.data.data.name,
                        email: response.data.data.email,
                        image: response.data.data.image
                    }));
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        getUser();
        fetchCart();
        GetUserOrder();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            if (formData.image) formDataToSend.append('image', formData.image);
            if (formData.newPassword) {
                formDataToSend.append('oldPassword', formData.oldPassword);
                formDataToSend.append('newPassword', formData.newPassword);
            }

            const response = await axios.put(`https://craftnest-backend-v5ki.onrender.com/api/user/update/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.data.success) {
                setUser(response.data.data);
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    if (!user) return <div className="loading">Loading...</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>{user.name}</h1>
                <p className="user-type">User</p>
            </div>

            <div className="profile-stats">
                <div className="stat-item">
                    <span className="stat-number">{orderItem?.length||0}</span>
                    <span className="stat-label">View Orders</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">{cart?.length||0}</span>
                    <span className="stat-label">View Cart</span>
                </div>
            </div>

            {!isEditing ? (
                <div className="profile-view">
                    <div className="profile-image-container">
                        <img 
                            src={user.image ? `https://craftnest-backend-v5ki.onrender.com/images/${user.image}` : '/default-profile.png'} 
                            alt="Profile" 
                            className="profile-image"
                        />
                    </div>
                    <div className="profile-details">
                        <div className="detail-row">
                            <span className="detail-label">Name:</span>
                            <span className="detail-value">{user.name}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Email:</span>
                            <span className="detail-value">{user.email}</span>
                        </div>
                    </div>
                    <button onClick={() => setIsEditing(true)} className="edit-button">
                        Update Profile
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label>Your Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Your Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Select Picture *</label>
                        <div className="file-input-wrapper">
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            <label htmlFor="image" className="file-input-label">
                                {formData.image?.name || 'Choose File'}
                            </label>
                            <span className="file-status">{!formData.image && 'No file chosen'}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Old Password *</label>
                        <input
                            type="password"
                            name="oldPassword"
                            placeholder="enter your old password"
                            value={formData.oldPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>New Password *</label>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="enter your new password"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password *</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="update-button">
                            Update Profile
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UserProfilePage;
