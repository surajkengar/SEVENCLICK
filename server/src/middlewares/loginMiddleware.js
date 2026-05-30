import jwt from "jsonwebtoken";

const isLogin = async (req , res , next)=>{
    try{
        console.log("check isLogin started");
        const{token} = req.cookies;
        console.log("token extracted");
            if(!token){
            return res.status(400).json({
                success : false,
                message : "invalid user"
            })
            }

        console.log("token is present");

        const Decode = jwt.verify(token , process.env.JWT_SECRET);

        req.user = Decode;

        console.log("token decoded and put in cookies");

    next();
    
    }catch(error){
        return res.status(401).json({
            success : false ,
            message :"user is not loginedin"
        })
    }

}

export default isLogin;