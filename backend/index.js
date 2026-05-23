import dotenv from "dotenv"
dotenv.config()

import express from 'express'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoute from "./routes/orderRoutes.js"
import adminRoute from "./routes/adminRoutes.js"


let port = process.env.PORT || 8000

let app = express()
app.set("trust proxy", 1)
app.use(express.json())
app.use(cookieParser())

app.use(cors({

   origin: true,

   credentials: true
}))
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/order", orderRoute)
app.use("/api/admin", adminRoute)



app.listen(port, () => {
   
    console.log(`Server is listen At ${port}`);

})
 connectDb()