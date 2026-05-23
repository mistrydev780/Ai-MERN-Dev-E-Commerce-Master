import razorpayInstance from "../config/razorpay.js"

import crypto from "crypto"
import Order from "../model/orderModel.js"

export const placeOrder = async (req, res) => {

    try {

        const {
            items,
            address,
            amount
        } = req.body

        const orderData = {
            userId: req.userId,
            items,
            address,
            amount
        }

        const order = await Order.create(orderData)

        return res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            order
        })

    } catch (error) {

        console.log("Place Order Error => ", error)

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const userOrders = async (req, res) => {

    try {

       const orders = await Order.find({
    userId: req.userId
}).populate("items.productId")

        return res.status(200).json({
            success: true,
            orders
        })

    } catch (error) {

        console.log("User Orders Error => ", error)

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const allOrders = async (req, res) => {

    try {

      const orders = await Order.find({})
    .populate("items.productId")
    .sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            orders
        })

    } catch (error) {

        console.log("All Orders Error => ", error)

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const updateOrderStatus = async (req, res) => {

    try {

        const { orderId, status } = req.body

        await Order.findByIdAndUpdate(
            orderId,
            { status }
        )

        return res.status(200).json({
            success: true,
            message: "Order Status Updated"
        })

    } catch (error) {

        console.log("Update Order Status Error => ", error)

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const razorpayOrder = async (req, res) => {

    try {

        const { items, address, amount } = req.body

        const options = {

            amount: amount * 100,

            currency: "INR",

            receipt: `receipt_${Date.now()}`
        }

        const order = await razorpayInstance.orders.create(options)

        return res.status(200).json({

            success: true,

            order
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({

            success: false,

            message: "Razorpay Error"
        })
    }
}

export const verifyRazorpay = async (req, res) => {

    try {

        const {

            razorpay_order_id,

            razorpay_payment_id,

            razorpay_signature,

            items,

            address,

            amount

        } = req.body

        const sign = razorpay_order_id + "|" + razorpay_payment_id

        const expectedSign = crypto

            .createHmac("sha256", process.env.RAZORPAY_SECRET)

            .update(sign.toString())

            .digest("hex")

        if (razorpay_signature === expectedSign) {

            const order = await Order.create({

                userId: req.userId,

                items,

                address,

                amount,

                paymentMethod: "Razorpay",

                payment: true,

                status: "Paid"
            })

            return res.status(200).json({

                success: true,

                message: "Payment Successful",

                order
            })
        }

        else {

            return res.status(400).json({

                success: false,

                message: "Invalid Signature"
            })
        }

    } catch (error) {

        console.log(error)

        return res.status(500).json({

            success: false,

            message: "Verification Failed"
        })
    }
}