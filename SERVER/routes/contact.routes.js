import { Router } from "express";
import { contactData } from "../controllers/contact.controller.js";
import authVerify from "../middlewares/Auth.middleware.js";
import contactSchema from "../validators/contact.validator.js";
import validator from '../middlewares/validator.middleware.js'

const router = Router();

router.route("/form").post(authVerify, validator(contactSchema), contactData)

export default router