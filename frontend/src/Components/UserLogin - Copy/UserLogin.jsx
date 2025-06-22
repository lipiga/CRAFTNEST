import React, { useState } from 'react'
import './UserLogin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserLogin = ({setShowuserlogin,setUsertype,userType}) => {
    const [state,setState] = useState("register")
    const navigate = useNavigate()
    const [image,setImage] = useState(false)
    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
        type:userType
    })
    const [logindata,setLogindata] = useState({
        email:'',
        password:""
    })

    const onchangeHandler = (e)=>{
        const name = e.target.name
        const value = e.target.value

        setData(data=>({...data,[name]:value}))
        setLogindata(logindata=>({...logindata,[name]:value}))
    }

    const onRegister = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("name",data.name)
        formData.append("email",data.email)
        formData.append("password",data.password)
        formData.append("type",data.type)
        formData.append("image",image)

        const response = await axios.post("https://craftnest-backend-v5ki.onrender.com/api/user/register",formData)
        if(response.data.success){
            toast.success(response.data.message)
            setShowuserlogin(false)
            setData({
                name:"",
                password:"",
                email:""
            })
            
            
        }else{
            toast.error(response.data.message)
        }
    }
    const onLogin = async(e)=>{
        e.preventDefault()
        const response = await axios.post("https://craftnest-backend-v5ki.onrender.com/api/user/login",logindata)
        if(response.data.success){
            
            setShowuserlogin(false)
            
        
            if(response.data.type==="seller"){
                toast.success("seller login success")
                localStorage.setItem("sellerid", response.data.userId)
                localStorage.setItem("sellerdetails", JSON.stringify(response.data.data))
                navigate('/seller')
            }else{
                toast.success('user login success')
                localStorage.setItem("userid", response.data.userId)
                navigate('/')
            }
        }else{
            toast.error(response.data.message)
        }
    }
  return (
    <div className='user-login'>
        {state==="register"?
              <div className='register'>
                  <form onSubmit={onRegister}>
                      <p onClick={()=>setShowuserlogin(false)} className='close'>X</p>
                      {userType=="seller"? <p>SELLER REGISTER</p> : <p>USER REGISTER</p>}
                      {/* <p>USER REGISTER</p> */}
                      <input onChange={onchangeHandler}  className='inputs' type='text' name='name' required placeholder='Enter Name' />
                      <input onChange={onchangeHandler}  className='inputs' type='email' name='email' placeholder='Enter Email' required />
                      <input onChange={(e)=>setImage(e.target.files[0])} className='inputs' type='file' required />
                      <input onChange={onchangeHandler}  className='inputs' type='password' name='password' placeholder='Enter Password' required />
                      <button type='submit'>Register</button>
                      <p>Already have an account?<span onClick={()=>setState("login")}>Login</span></p>
                  </form>
              </div>:
              <div className='login-form'>
                  <form onSubmit={onLogin}>
                      <p onClick={() => setShowuserlogin(false)} className='close'>X</p>
                      {userType=="seller"? <p>SELLER LOGIN</p> : <p>USER LOGIN</p>}
                      <input onChange={onchangeHandler}  className='inputs' type='email' name='email' placeholder='Enter email' required />
                      <input onChange={onchangeHandler}  className='inputs' type='password' name='password' placeholder='Enter Password' required />
                      <button type='submit'>Login</button>
                      <p>Don't have an account?<span onClick={()=>setState("register")}>Register Now</span></p>
                  </form>
              </div>
        }
        
    </div>
  )
}

export default UserLogin
