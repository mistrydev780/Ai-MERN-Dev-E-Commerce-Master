import Order from "../model/orderModel.js"
import Product from "../model/productModel.js"
import User from "../model/userModel.js"

export const dashboardData = async (req, res) => {

    try {

        const orders = await Order.find({})

        const products = await Product.find({})

        const users = await User.find({})

        let totalRevenue = 0

        orders.forEach((item) => {
            totalRevenue += item.amount
        })

        return res.status(200).json({
            success: true,

            analytics: {
                totalOrders: orders.length,
                totalProducts: products.length,
                totalUsers: users.length,
                totalRevenue
            },

            recentOrders: orders.reverse().slice(0, 5)
        })

    } catch (error) {

        console.log("Dashboard Error => ", error)

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}