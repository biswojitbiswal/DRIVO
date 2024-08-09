import {Router} from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { registerUser, loginUser } from '../controllers/user.controller.js';
import registerSchema from '../validators/register.validators.js';
import loginSchema from '../validators/login.validators.js';
import validate from '../middlewares/validator.middleware.js';

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        }
    ]),
    validate(registerSchema),
    registerUser
);

router.route("/login").post(validate(loginSchema), loginUser);

export default router;