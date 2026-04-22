import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./src/config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import adminRouter from "./src/routes/adminRoutes.js"
import blogRouter from "./src/routes/blogRoutes.js"

dotenv.config()


const app = express()

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)


connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})




