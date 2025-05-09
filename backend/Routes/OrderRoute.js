import { PlaceOrder, SellerOrder, UpdateStatus, UserOrder } from "../Controllers/OrderController.js";
import express from 'express'

const OrderRouter = express.Router()

OrderRouter.post("/placeorder",PlaceOrder)
OrderRouter.get("/getuserorder",UserOrder)
OrderRouter.get("/getsellerorder",SellerOrder)
OrderRouter.put("/updatestatus/:seller_id",UpdateStatus)

export default OrderRouter