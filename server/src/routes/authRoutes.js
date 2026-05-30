import express from "express";
import { registerController , verifyEmail ,Login , Getme , logout ,forgotpassword , resetpassword} from "../controller/auth.controller.js";
import {forgotpasswordValidator, registerValidator} from "../validators/authvalidator.js";
import { verifyEmailValidator , loginValidator , resetpasswordValidator } from "../validators/authvalidator.js";
import validate from "../middlewares/validationMiddlewares.js";
import isLogin from "../middlewares/loginMiddleware.js";

const router = express.Router();


router.post("/register" , registerValidator , validate ,registerController );
router.get("/verifyuser/:token" ,verifyEmailValidator  , validate , verifyEmail);
router.post("/login" ,loginValidator ,validate , Login );
router.get("/getme",isLogin , Getme);
router.post("/logout" ,isLogin , logout );
router.post("/forgotpassword" ,forgotpasswordValidator , validate , forgotpassword );
router.post("/resetpassword/:token" ,resetpasswordValidator , validate , resetpassword);

export default router;