import app from "./app.js";
import Connectdb from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
//connect to database
Connectdb();




app.listen(PORT ,()=>{
    console.log(`server started on port ${PORT}`);
})