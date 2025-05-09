import express from 'express'
import { AddCart, DeleteCart, GetCart } from '../Controllers/CartController.js'
import isAuth from '../MiddleWare/Auth.js'

const CartRouter = express.Router()

CartRouter.post("/addtocart",AddCart)
CartRouter.post("/delete",DeleteCart)
CartRouter.get("/get", GetCart)
export default CartRouter