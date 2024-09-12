import { Router } from "express";
import { getAllUsers, getAllContacts, deleteuser, getUserById, editUserById, deleteContact } from "../controllers/admin.controllers.js";
import authVerify from "../middlewares/Auth.middleware.js";
import adminVerify from "../middlewares/admin.middleware.js";


const router = Router();

router.route("/users").get(authVerify, adminVerify, getAllUsers);
router.route("/contacts").get(authVerify, adminVerify, getAllContacts);
router.route("/deleteuser/:userId").delete(authVerify, adminVerify, deleteuser);
router.route("/user/:userId").get(authVerify, adminVerify, getUserById);
router.route("/user/edit/:userId").patch(authVerify, adminVerify, editUserById)
router.route("/contact/delete/:id").delete(authVerify, adminVerify, deleteContact)

export default router;