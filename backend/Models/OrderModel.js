import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    phone: { type: String, required: true },
    user_id: { type: String, required: true },
    doorno: { type: String, required: true },
    street: { type: String, required: true },
    area: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    product: { type: Object, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: "In Progress" },
    payment: { type: Boolean, required: true, default: false },
    paymentMethod: { 
        type: String, 
        required: true,
        enum: ["Cash on Delivery", "Online Payment"], // Ensures only these values are accepted
        default: "Cash on Delivery" 
    }
})

const OrderModel = mongoose.models.order || mongoose.model("order", OrderSchema)

export default OrderModel