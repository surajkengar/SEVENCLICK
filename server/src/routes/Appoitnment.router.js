import express from "express";
import { BookAppoitnment, cancleAppoitnmet, getAllMyAppoitnment } from "../controller/Appoitnment.controller.js";
import isLogin from "../middlewares/loginMiddleware.js";

const appointmentrouter = express.Router();

appointmentrouter.post("/bookappoitnment",          isLogin, BookAppoitnment);
appointmentrouter.get("/getallappoitnment",         isLogin, getAllMyAppoitnment);
appointmentrouter.delete("/cancleappoitnment/:id",  isLogin, cancleAppoitnmet);

export default appointmentrouter;