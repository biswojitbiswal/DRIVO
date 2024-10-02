import {Router} from 'express';
import authVerify from '../middlewares/Auth.middleware.js'
import { registerUser, loginUser, getCurrUsers, editUsernameById } from '../controllers/user.controller.js';
import registerSchema from '../validators/register.validators.js';
import loginSchema from '../validators/login.validators.js';
import validate from '../middlewares/validator.middleware.js';

const router = Router();

router.route("/register").post
    (
    validate(registerSchema),
    registerUser
);

router.route("/login").post(validate(loginSchema), loginUser);
router.route("/getuser").get(authVerify, getCurrUsers);
router.route("/editusername").patch(authVerify, editUsernameById);

export default router;