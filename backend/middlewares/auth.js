import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization ;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
    try {
        let token = authHeader;
        if (typeof token === "string" && token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }
        console.log("Authorization Header:", req.headers.authorization);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded && decoded.id ? decoded.id : decoded;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        req.user = user;
        next();
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
}