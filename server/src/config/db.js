import mongoose from "mongoose";
import dotenv from "dotenv";
const Connectdb = async ()=>{
    try{
        console.log("database connection started");
        const connection = await mongoose.connect(process.env.MONGO_URL)
        console.log("databse connected successfully");
    }catch(error){
        console.log("database connection failed",error);
        process.exit(1);
    }
}

export default Connectdb;