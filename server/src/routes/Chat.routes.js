import express from "express";
import { clearChat, sendMessage, getChatHistory } from "../controller/Chat.controller.js";
import isLogin from "../middlewares/loginMiddleware.js";

const chatRouter = express.Router();

chatRouter.get("/getchathistory",   isLogin, getChatHistory);
chatRouter.post("/sendmessage",     isLogin, sendMessage);
chatRouter.delete("/clearchat",     isLogin, clearChat);

export default chatRouter;