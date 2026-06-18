import Appoitnment from "../models/Appoitnment.model.js";
import User from "../models/User.models.js";
// ── Book appointment ────────────────────────────────────
export const BookAppoitnment = async (req, res) => {
  try {
    const { service, fullname, emailid, date, timeslot, note } = req.body;

    // validation
    if (!service || !fullname || !emailid || !date || !timeslot) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

        // ✅ check plan limits
    const user = await User.findById(req.user.id);

    // get current month appointments
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyCount = await Appoitnment.countDocuments({
      user:      req.user.id,
      createdAt: { $gte: startOfMonth },
      status:    { $in: ["pending", "confirmed"] },
    });

    // check limit based on plan
    const limits = { free: 2, standard: 10, pro: Infinity };
    const userLimit = limits[user.plan] || 2;

    if (monthlyCount >= userLimit) {
      return res.status(403).json({
        success: false,
        message: `Your ${user.plan} plan allows only ${userLimit} appointments per month. Please upgrade your plan.`,
      });
    }

    // check duplicate appointment
    const existing = await Appoitnment.findOne({
      user:   req.user.id,
      service,
      date:   new Date(date),
      time:   timeslot,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You already have an appointment at this time slot",
      });
    }

    // create appointment
    const appoitnment = await Appoitnment.create({
      user:    req.user.id,
      service,
      fullname,
      emailid,
      date:    new Date(date),
      time:    timeslot,
      note:    note || "",
      status:  "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appoitnment,
    });

  } catch (error) {
    console.log("book appointment error", error);
    return res.status(500).json({
      success: false,
      message: "Failed to book appointment",
    });
  }
};

// ── Get all appointments of logged in user ──────────────
export const getAllMyAppoitnment = async (req, res) => {
  try {
    const appoitnments = await Appoitnment.find({ user: req.user.id })
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      total: appoitnments.length,
      appoitnments,
    });

  } catch (error) {
    console.log("getMyAppoitnment error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get appointments",
    });
  }
};

// ── Cancel an appointment ───────────────────────────────
export const cancleAppoitnmet = async (req, res) => {
  try {
    const appoitnment = await Appoitnment.findById(req.params.id);

    // check if exists
    if (!appoitnment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // check ownership
    if (appoitnment.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not allowed",
      });
    }

    // check if already completed
    if (appoitnment.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Appointment is already completed",
      });
    }

    // check if already cancelled
    if (appoitnment.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Appointment is already cancelled",
      });
    }

    // cancel it
    appoitnment.status = "cancelled";
    await appoitnment.save();

    return res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
    });

  } catch (error) {
    console.log("cancelAppointment error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to cancel appointment",
    });
  }
};