import OrderModel from "../Models/OrderModel.js";

import CartModel from "../Models/CartModel.js"



const PlaceOrder = async (req, res) => {
    const {
        user_id,
        doorno,
        street,
        area,
        amount,
        district,
        state,
        username,
        phone,
        pincode,
        product,
        paymentMethod
    } = req.body;

    try {
        const order = new OrderModel({
            username: username,
            phone: phone,
            user_id: user_id,
            doorno: doorno,
            street: street,
            area: area,
            district: district,
            state: state,
            pincode: pincode,
            product: product,
            amount: amount,
            paymentMethod: paymentMethod,
            payment: paymentMethod === "Online Payment" // Set payment status based on method
        });

        const orderPlaced = await order.save();
        await CartModel.deleteMany({ "user_id": user_id });

        if (orderPlaced) {
            res.json({ success: true, message: "Order placed successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            success: false, 
            message: "Error placing order",
            error: error.message 
        });
    }
}
const UserOrder = async(req,res)=>{

    const { user_id } = req.headers
    const userOrder = await OrderModel.find({ "user_id": user_id })
    res.json({ success: true, data: userOrder })
}

const SellerOrder = async(req,res)=>{
    const {seller_id} = req.headers
    const sellerOrder = await OrderModel.find({ 'product.seller_id':seller_id } )
    res.json({success:true,data:sellerOrder})
}

const UpdateStatus = async (req, res) => {
    const { orderId, productId, status } = req.body;
    const { seller_id } = req.params;

    if (!orderId || !productId || !status || !seller_id) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: orderId, productId, status, seller_id"
        });
    }

    try {
        // Update the status of the matching product inside the product array
        const result = await OrderModel.updateOne(
            {
                _id: orderId,
                "product._id": productId,
                "product.seller_id": seller_id
            },
            {
                $set: {
                    "product.$.status": status
                }
            }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found or status not updated"
            });
        }

        res.json({
            success: true,
            message: "Product status updated successfully"
        });

    } catch (error) {
        console.error("Status update error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


export {PlaceOrder,UserOrder,SellerOrder,UpdateStatus}