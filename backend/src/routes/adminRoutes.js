import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import verifyRole from "../middleware/verifyRole.js";
import Appointment from "../model/Appointment.js";
import User from "../model/User.js";

const router = express.Router();

// get the summary for dashboard
router.get("/summary", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();
    const completed = await Appointment.countDocuments({ status: "completed" });
    const pending = await Appointment.countDocuments({ status: "pending" });
    const cancelled = await Appointment.countDocuments({
      status: "cancelled",
    });
    const totalPatients = await User.countDocuments({ role: "patients" });
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const data = {
      totalAppointments,
      completed,
      pending,
      cancelled,
      totalPatients,
      totalDoctors,
    };
    res.status(200).json({
      data: data,
      message: "Fetched all the summary",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load summary",
      error: error.message,
    });
  }
});

export default router;
