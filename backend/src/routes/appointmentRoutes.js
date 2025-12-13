import express from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  getDoctors,
  updateAppointment,
} from "../controller/appointmentController.js";
import verifyToken from "../middleware/verifyToken.js";
import verifyRole from "../middleware/verifyRole.js";
const router = express.Router();

router.get("/doctors", getDoctors);

// Patient can only create appointment
router.post("/", verifyToken, verifyRole("patient"), createAppointment);
// Admin can get all -> patient and doctor can get theirs
router.get("/", verifyToken, getAppointments);

// get by id
router.get(
  "/:id",
  verifyToken,
  verifyRole("admin", "doctor", "patient"),
  getAppointmentById
);
// Update
router.put(
  "/:id",
  verifyToken,
  verifyRole("admin", "doctor"),
  updateAppointment
);
router.delete(
  "/:id",
  verifyToken,
  verifyRole("patient", "admin"),
  deleteAppointment
);

export default router;
