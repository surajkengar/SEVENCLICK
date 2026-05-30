import express from "express";
import cors from "cors";
import authroutes from "./routes/authRoutes.js";
import appointmentrouter from "./routes/Appoitnment.router.js";
import chatRouter from "./routes/Chat.routes.js";
import cookieparser from "cookie-parser";



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());

app.use(
    cors({
        origin :  process.env.CORS_ORIGIN|| "http://localhost:5173",
        credentials : true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)

app.use("/api/v1/auth" , authroutes);
app.use("/api/v1/appoitnment" , appointmentrouter);
app.use("/api/v1/chat" , chatRouter);

app.get("/" ,(req , res) => {
    res.send("server is running");
})


export default app;