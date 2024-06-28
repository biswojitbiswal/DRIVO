import { AsyncHandler } from "../utils/AsyncHandler.js";

const verifyAdmin = AsyncHandler( async(req, res, next) => {
    try {
        const user = req.user

        if(user.isAdmin) {
            return next();
        }

        return res.redirect('/error');
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Backend Error"});
    }
})

export default verifyAdmin;