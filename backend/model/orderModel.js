import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },

            size: String,

            quantity: Number
        }
    ],

    address: {
        firstName: String,
        lastName: String,
        email: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
        phone: String
    },

    amount: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        default: "COD"
    },

    payment: {
        type: Boolean,
        default: false
    },

    status: {
        type: String,
        default: "Order Placed"
    }

}, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)

export default Order