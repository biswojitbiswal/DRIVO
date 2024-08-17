import { Router } from "express";
import { getAllUsers, getAllContacts } from "../controllers/admin.controllers.js";
import authVerify from "../middlewares/Auth.middleware.js";
import adminVerify from "../middlewares/admin.middleware.js";


const router = Router();

router.route("/users").get(authVerify, adminVerify, getAllUsers)
router.route("/contacts").get(authVerify, adminVerify, getAllContacts)

export default router;