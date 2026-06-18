import express from "express";
import { createOrder , verifypayment , getPaymentHistory} from "../controller/Payment.controller.js";
import isLogin from "../middlewares/loginMiddleware.js";


const paymentRouter = express.Router();

paymentRouter.post("/createorder" , isLogin , createOrder);
paymentRouter.post("/verifypayment" , isLogin , verifypayment);
paymentRouter.get("/history" , isLogin , getPaymentHistory);

export default paymentRouter;