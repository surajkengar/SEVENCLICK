import express from "express";
import {
  getAllUsers,
  blockUser,
  getAllAppoitnment,
  updateAppointmentStatus,
  getAnalytics
} from "../controller/admin.controller.js";
import isLogin from "../middlewares/loginMiddleware.js";
import isAdmin from "../middlewares/AdminMiddleware.js";

const adminRouter = express.Router();

adminRouter.get("/allusers",                isLogin, isAdmin, getAllUsers);
adminRouter.patch("/blockuser/:id",         isLogin, isAdmin, blockUser);
adminRouter.get("/allappointments",         isLogin, isAdmin, getAllAppoitnment);
adminRouter.patch("/appointmentstatus/:id", isLogin, isAdmin, updateAppointmentStatus);
adminRouter.get("/analytics",               isLogin, isAdmin, getAnalytics);

export default adminRouter;