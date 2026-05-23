import express from "express"
import { allOrders, placeOrder, razorpayOrder, updateOrderStatus, userOrders, verifyRazorpay } from "../controllers/orderController.js"
import isAuth from "../middleware/isAuth.js"

const orderRoute = express.Router()

orderRoute.post("/place", isAuth, placeOrder)

orderRoute.get("/userorders", isAuth, userOrders)

orderRoute.get("/allorders", allOrders)

orderRoute.post("/status", updateOrderStatus)

orderRoute.post("/razorpay", isAuth, razorpayOrder)

orderRoute.post("/verifyrazorpay", isAuth, verifyRazorpay)

export default orderRoute