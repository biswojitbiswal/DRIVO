import {Router} from 'express';
import authVerify from '../middlewares/Auth.middleware.js'
import {upload} from '../middlewares/multer.middleware.js'
import { registerUser, loginUser, getCurrUsers, editUsernameById, passChange, editUserAvatar } from '../controllers/user.controller.js';
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
router.route("/changePass").patch(authVerify, passChange);
router.route("/addavatar").patch
    (
        upload.fields([
            {
                name: "avatar",
                maxCount: 1
            },
        ]),
        authVerify,
        editUserAvatar
);

export default router;