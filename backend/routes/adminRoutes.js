import express from "express"
import { dashboardData } from "../controllers/adminController.js"
import adminAuth from "../middleware/adminAuth.js"

const adminRoute = express.Router()

adminRoute.get("/dashboard",adminAuth, dashboardData)

export default adminRoute