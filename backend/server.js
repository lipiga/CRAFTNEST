import dotenv from "dotenv"
dotenv.config()
import express from 'express'

import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import SellerRouter from './Routes/SellerRoute.js'
import UserRouter from './Routes/UserRoute.js'
import ProductRouter from './Routes/ProductRoute.js'
import CartRouter from './Routes/CartRoute.js'
import OrderRouter from './Routes/OrderRoute.js'
import { fileURLToPath } from 'url'
import ReviewRouter from './Routes/ReviewRoute.js'



const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname,'public')))





mongoose.connect("mongodb+srv://LipigaAlagarsamy:agipil175@cluster0.00nca4d.mongodb.net/frostbyte").then(console.log("Database Connected"))





//function api's

app.use("/api/seller",SellerRouter)
app.use("/images",express.static('uploaded_files'))
app.use("/api/user",UserRouter)
app.use("/api/product",ProductRouter)
app.use("/api/cart",CartRouter)
app.use("/api/order",OrderRouter)
app.use("/api/review",ReviewRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})


app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/dist','index.html'))
})
