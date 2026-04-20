import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}