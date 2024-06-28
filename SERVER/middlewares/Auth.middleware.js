import { User } from "../model/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import jwt from 'jsonwebtoken';

const authVerify = AsyncHandler( async(req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            return res.status(401).json({message: "Unauthorized Request!"});
        }

        const decodeToken = await jwt.verify(token, process.env.ACCESSTOKEN_SECRET_KEY);

        const user = await User.findById(decodeToken._id).select("-password");

        if(!user){
            return res.status(401).json({message : "Invalid Access Token"});
        }

        req.user = user;
        req.token = token;
        req.userId = user._id;

        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid Access Token"});
    }
})

export default authVerify;