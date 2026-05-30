import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
        trim : true
    },

    emailid : {
        type : String,
        required : true,
        trim :true,
        lowercase : true,
        unique : true
    },

    mobileno : {
        type :String,
        required : true,
        trim : true
    },

    password : {
        type : String,
        required : true,
        minlength : 6
    },

    verificationToken :{
        type : String 
    },

    verificationTokenExpity : {
        type : Date
    },

    isVerified : {
        type : String,
        default : false
    },

    referralid : {
        type : String,
        trim : true
    },

    resetpasswordToken : {
        type : String 
    },

    resetpasswordExpiry : {
        type : Date
    },

    avatar : {
        type : String,
        default : ""
    }




},{
    timestamps :true
});

const User = mongoose.model("User" ,userSchema);

export default User;

