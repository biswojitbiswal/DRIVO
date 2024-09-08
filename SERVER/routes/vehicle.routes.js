import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addVehicle, getAllVehicle, getVehicle, newBooking } from "../controllers/vehicle.controllers.js";
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

export default router

