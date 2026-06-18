import User from "../models/User.models.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import jwt from "jsonwebtoken";


//helper function to sending emails

const sendemail =   async (to , subject , text)=>{
       const transporter = nodemailer.createTransport({
            host : "sandbox.smtp.mailtrap.io",
            port : 2525 ,
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS
            }
       })

       const mailoptions = {
            from : `"My App" <noreply@myApp.com>`,
            to,
            subject,
            text
       };

       await transporter.sendMail(mailoptions);
}

// register controller

export const registerController = async (req , res)=>{
    try{
    console.log("user registration started");
    const{fullname , emailid , mobileno , password , referralid} = req.body;
    console.log(emailid);
    //check existing user
    console.log("extract data from body");
    const existingUser = await User.findOne({emailid});

    if(existingUser){
        return res.status(400).json({
            success : false,
            message : "User already exist"
        })
    }
    console.log("user present");
    //hash password

    const hashpassword = await bcrypt.hash(password , 10);
    console.log("password hashed");
    const verificationToken = crypto.randomBytes(32).toString("hex");
    console.log("token created");
    const hashedverificationToken = crypto
                                    .createHash("sha256")  
                                    .update(verificationToken)
                                    .digest("hex")
    console.log("token hashed");
    const verificationTokenExpiry = new Date(Date.now() + 15*60*1000);
    console.log("define expiry");
    //create a user in database

    const Newuser = await User.create({
         fullname,
         emailid,
         mobileno,
         password:hashpassword,
         referralid,
         verificationToken : hashedverificationToken,
         verificationTokenExpiry,
         isVerified : false
    })
    console.log("new user created and saved ");
    const verificationLink = ` https://sevenclick.onrender.com/api/v1/auth/verifyuser/${verificationToken}`;

    await sendemail(
        Newuser.emailid,
        "verify your email",
        `please verify your email by clicking this Link : ${verificationLink}`
    )
    console.log("mail send successfully");
    res.status(200).json({
        success : true,
        message : "user registered successful . please verify your mail"
    })

}catch(error){
    console.log(error);

    return res.status(500).json({
        success : false,
        message : "user failed to register"
    })
}

}   

export const verifyEmail = async (req , res)=>{
        try{
           const{token} = req.params; 

           //hash these token beacuse we store token in db hashed

           const hashedToken = crypto
                               .createHash("sha256")
                               .update(token)
                               .digest("hex")

            //find user by verification token

            const user = await User.findOne({verificationToken : hashedToken});

            //check whether user is present or not

            if(!user){
                res.status(400).json({
                    success : false,
                    message : "Invalid Token"
                })
            }

            //marked user as a verified

             user.isVerified = true;
             user.verificationToken = undefined;

             await user.save();
             
             return res.status(200).json({
                success : true,
                message : "email verified successfully"
             })

        }catch(error){
            return res.status(400).json("email verification failed");
        }
}

export const Login = async (req , res)=>{
    try{
      // get email and password from request body
    console.log("REQ BODY:", req.body); // ← add this line
      console.log("code execuation started");
       const{emailid , password} = req.body;

    // check if user exist

       const existingUser = await User.findOne({emailid});
        
       if(!existingUser){
            return res.status(400).json({
                success : false,
                message : "Invalid emailid or password"
            })
       }
    
       console.log("user exist");
       console.log(existingUser.isVerified);
    // check email is verified or not

       if((existingUser.isVerified === false)){
            return res.status(400).json({
                success : false,
                message : "please verify your email address"
            })
       }
       console.log("verified user");
    //compared hashed password with password stored in database
       console.log("input password:", password);
        console.log("stored hash:", existingUser.password);
        console.log("hash length:", existingUser.password?.length);
    const isMatch = await bcrypt.compare(password , existingUser.password);

    if(!isMatch){
        return res.status(400).json({
            success : false,
            message : "invalid email or password"
        })
    }
    console.log("password matched");
    // create JWT token

    const token = jwt.sign(
        {id : existingUser._id,
         role: existingUser.role
        },
        process.env.JWT_SECRET,
        {expiresIn : "24h"}
    )
    console.log("jwt token created");
    const options = {
        httpOnly : true,
        secure : true,
        sameSite : "none",
        maxAge:24 * 60 * 60 * 1000
    }
    console.log("jwt token set");
    //send jwt token in cookies

    res.cookie("token" , token , options);
    console.log("cookies send successfully");
    //send successfully login msg

    return res.status(200).json({
        success : true,
        message : "user successfully login"
    })

    }catch(error){
        return res.status(400).json({
            success : false,
            message : "user failed to login"
        })
    }




}

export const Getme = async (req , res) =>{
    try{
             //check use in database using id
        console.log("code execution started");
        const user = await User.findById(req.user.id).select("-password");
        console.log("getme user:", user);
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Invalid user"
            })
        }

        console.log("user are exist");

        return res.status(200).json({
            success : true,
            message : "data fetched successfully",
            user
        })
    }catch(error){
        return res.status(500).json({
            success : false,
            message : "data fetching failed"
        })
    }

     
}

export const logout = async (req , res) => {
    // clear cookies 

    res.cookie("token","",{
        httpOnly : true,
        expires : new Date(0),
        secure : true,
        sameSite : "none"
    })

    return res.status(200).json({
        success : true,
        message : "user logout successfully"
    })
}

export const forgotpassword = async(req , res , next)=>{
        //get email from req body
        try{
            console.log("code execution started");
            const{emailid} = req.body;

            console.log("user emailid get");
            // check user is present in database or not

            const user = await User.findOne({emailid});
        
        // do not reveal whether user is exist or not 
        if(!user){
            return res.status(200).json({
                success : true,
                message : "if your account exist , password Reset link send to your registered mail id"
            })
        }

        console.log("checked user present or not");

        const token = crypto.randomBytes(32).toString("hex");
        console.log("create a radom token");
        const hashedToken =  crypto
                .createHash("sha256")
                .update(token)
                .digest("hex")
        console.log("token is hashed :",hashedToken);
         user.resetpasswordToken = hashedToken;
         user.resetpasswordExpiry = Date.now() + 15 * 60 * 1000;

        await user.save();

        console.log("resetpassword and resetexpiry save in memory");
        const resertLink = `https://sevenclick.onrender.com/resetpassword/${token}`;

        await sendemail(
            user.emailid,
            "Reset your passwoord",
            `please reset your password by clicking this link ${resertLink}`
        )

        console.log("link send to user");

        return res.status(200).json({
            success : true ,
            message : "if account exist , resetpassword sent to your registered email id"
        })
        }catch(error){
            return res.status(400).json({
                success : false,
                message : "Failed reseting password"

            })
        }
}

export const resetpassword = async (req , res , next)=>{
    try{
        // get token from params and newpassword from body
        console.log("password resetting started");
        console.log("params token:",req.token);
        const{token} =  req.params;
        const{password} = req.body;
        console.log("token and password extracted :",token);
        const hashedToken = crypto
                                .createHash("sha256")
                                .update(token)
                                .digest("hex")
        console.log("token hashed");
        console.log(hashedToken);
        const user = await User.findOne({
            resetpasswordToken : hashedToken,
            resetpasswordExpiry : {$gt : Date.now()}
        })
        console.log("user get");
        if(!user){
            return res.status(400).json({
                success : false,
                message : "invalid or expired token"
            })
        }
        console.log("token is valid");
        // hash password

        const hashPassword = await bcrypt.hash(password , 10);

        // update password and reset token fields
        user.password = hashPassword;
        user.resetpasswordToken = undefined;
        user.resetpasswordExpiry = undefined;

        console.log("password hashed and reset");

        await user.save();

        console.log("user saved successfully");
        return res.status(200).json({
            success : true,
            message : "reset password successfully"
        })

    }catch(error){
        return res.status(400).json({
            success : true,
            messsage : "failed to reset password"
        })
    }
}

