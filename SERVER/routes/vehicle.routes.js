import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addVehicle, getAllVehicle, getVehicle, newBooking, razorpayVerify } from "../controllers/vehicle.controllers.js";
import authVerify from "../middlewares/Auth.middleware.js";
import adminVerify from "../middlewares/admin.middleware.js"

const router = Router();

router.route("/add").post(
    authVerify,
    adminVerify,
    upload.fields([
        {
            name: "image",
            maxCount: 1,
        }
    ]),
    addVehicle
)

router.route("/getvehicles").get(getAllVehicle);
router.route("/:vehicleId").get(authVerify, getVehicle);
router.route("/booking/:vehicleId").post(authVerify, newBooking);
router.route("/verify").post(authVerify, razorpayVerify);

export default router

