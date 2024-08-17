import { User } from "../model/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const adminVerify = AsyncHandler(async(req, res, next) => {
    try {
        const admin = await req.user.isAdmin;

        if(!admin){
            return res.status(403).json({message: "Access Denied!, Not an admin"})
        }

        next();
    } catch (error) {
        next(error)
    }
})

export default adminVerify