import User from "../models/User.models.js";
import Appoitnment from "../models/Appoitnment.model.js";
import Chat from "../models/Chat.js";


// controller for get all user

export const getAllUsers = async (req , res)=>{
    try{
        const users = await User.find({role : "user"})
                      .select("-password")
                      .sort({createdAt:-1});

        return res.status(200).json({
            success : true,
            total : users.length,
            users
        });

    }catch(error){
        return res.status(500).json({
            success : false,
            message : "failed to get user"
        })
    }
}

// controller for block user

export const blockUser = async (req , res) =>{
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }

        user.isBlocked = !user.isBlocked;
        await user.save();

        return res.status(200).json({
            success:true,
            message: user.isBlocked?"user blocked":"user unBlocked",
            user
        })
    }catch(error){
        console.log("blockuser error :",error);
        return res.status(500).json({
            success : false,
            message : "Failed  to blockuser",
        });
    }
}

// controller for getAllAppoitnment

export const getAllAppoitnment = async (req , res)=>{
    try{
        const appointments = await Appoitnment.find()
        .populate("user" , "fullname  emailid mobileno")
        .sort({createdAt : -1});

        return res.status(200).json({
            success : true,
            total : appointments.length,
            appointments
        });
    }catch(error){
        console.log("getAllappoitnment error",error);
        return res.status(500).json({
            success : false,
            message: "Failed to getAllappoitnment"
        });
    }
};

// controller for update status

export const updateAppointmentStatus = async (req , res) =>{
        try{
            const {status} = req.body;

            if(!["pending","confirmed","cancelled","completed"].includes(status)){
                return res.status(400).json({
                    success : false,
                    message : "Invalid Status"
                });
            }

            const appointment = await Appoitnment.findByIdAndUpdate(
                req.params.id,
                {status},
                {new:true}

            )

            if(!appointment){
                return res.status(404).json({
                    success: false,
                    message : "Appoinment not found"
                });
            }

            return res.status(200).json({
                success : true,
                message : `Appointment ${status} successfully`,
                appointment
            });
        }catch(error){
            console.log("updateAppointment status error",error);

            return res.status(500).json({
                success : false,
                message : "failed to update appointment status"
            })
        }
}

// controller for  analytics

export const getAnalytics = async (req , res) => {
    try{
        const totalUser = await User.countDocuments({role : "user"});
        const totalAppointment = await Appoitnment.countDocuments();
        const pendingAppts = await Appoitnment.countDocuments({status : "pending"});
        const confirmedAppts = await Appoitnment.countDocuments({status : "confirmed"});
        const cancelledAppts = await Appoitnment.countDocuments({status:"cancelled"});
        const completedAppts = await Appoitnment.countDocuments({status :"completed"});
        const totalChat = await Chat.countDocuments();

        //most booked services
        const serviceStates = await Appoitnment.aggregate([
            {$group :{_id:"$service",count:{$sum :1}}},
            {$sort : {count : -1}}
        ])

        return  res.status(200).json({
            success : true,
            analytics : {
                totalUser,
                totalAppointment,
                totalChat,
                appointments : {
                    pending : pendingAppts,
                    confirmed : confirmedAppts,
                    cancelled : cancelledAppts,
                    completed : completedAppts
                },
                serviceStates
            }
        });
    }catch(error){
        console.log("getAnnalytics errorn:",error);
        return res.status(500).json({
            success :false,
            message : "Failed to get Analytics "
        })
    }
}