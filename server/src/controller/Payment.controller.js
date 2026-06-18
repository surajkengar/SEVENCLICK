import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import User from "../models/User.models.js";


const razorpay = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const PLANS = {
    standard : {amount : 49900 , name : "standard plan"},
    pro : {amount : 99900 , name : "pro plan"}
}


//  Api for create order

export const createOrder =  async (req , res)=>{
    try{
        const{plan} = req.body;

        if(!PLANS[plan]){
            return res.status(400).json({
                success : false,
                message :"Invalid plan selected",
            })
        }

        //create razorpay order

        const order = await razorpay.orders.create({
            amount : PLANS[plan].amount,
            currency : "INR",
            receipt : `receipt_${req.user.id.slice(-6)}_${Date.now()}`,
        });

        // save order in database

        await Payment.create({
            user : req.user.id,
            razorpayOrderId : order.id,
            plan,
            amount : PLANS[plan].amount,
            status : "created"
        });

        //send response

        return res.status(200).json({
            success : true,
            order,
            key : process.env.RAZORPAY_KEY_ID,
            plan,
            amount : PLANS[plan].amount,
        })
    }catch(error){
        console.log("create order error",error)
        return res.status(500).json({
            success :false,
            message : "failed create order"
        })
    }
}

// Api for verify payment 

export const verifypayment = async (req,  res) =>{
    try{
        const{razorpay_payment_id , razorpay_order_id , razorpay_signature , plan} = req.body;

        // verify signature

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
                    .createHmac("sha256" , process.env.RAZORPAY_KEY_SECRET)
                    .update(body)
                    .digest("hex");

        if(expectedSignature !== razorpay_signature){
            return res.status(400).json({
                success : false,
                message :"payment verification failed",
            });
        }

        //update payment in db

        await Payment.findOneAndUpdate(
            {razorpayOrderId : razorpay_order_id},
            {
                razorpayPaymentId : razorpay_payment_id,
                razorpaySignature : razorpay_signature,
                status : "paid"
            }
        )

        //update user plan 

        await User.findByIdAndUpdate(req.user.id , {plan});

        return res.status(200).json({
            success : true,
            message : "payment successfully ! plan upgraded"
        })
    }catch(error){
        console.log("verifyPayment error:", error);
        return res.status(500).json({
        success: false,
        message: "Payment verification failed",
    });
    }
}

// Api for get payment history

export const getPaymentHistory = async (req , res)=>{
        try{
            const payment = await Payment.find({user : req.user.id})
                            .sort({createdAt : -1});

            return res.status(200).json({
                success : true,
                payment
            })
        }catch(error){
            console.log("getPaymentHistory error:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to get payment history",
            });
        }
}