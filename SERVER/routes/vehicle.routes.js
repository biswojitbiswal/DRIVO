import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addVehicle, deleteVehicle, editVehicleInfo, getAllVehicle, getVehicle, newBooking, razorpayVerify } from "../controllers/vehicle.controllers.js";
import authVerify from "../middlewares/Auth.middleware.js";
import adminVerify from "../middlewares/admin.middleware.js"
import { editUserById } from "../controllers/admin.controllers.js";

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
router.route("/delete/:vehicleId").delete(authVerify, adminVerify, deleteVehicle);
router.route("/edit/:vehicleId").patch(
    authVerify, 
    adminVerify, 
    upload.fields([
        {
            name: "image",
            maxCount: 1,
        }
    ]),
    editVehicleInfo
)

export default router

