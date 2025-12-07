import express from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  updateAppointment,
} from "../controller/appointmentController.js";
import verifyToken from "../middleware/verifyToken.js";
import verifyRole from "../middleware/verifyRole.js";
const router = express.Router();
// Patient can only create appointment
router.post("/", verifyToken, verifyRole("patient"), createAppointment);
// Admin can get all -> patient and doctor can get theirs
router.get("/", verifyToken, getAppointments);

//
router.get(
  "/:id",
  verifyToken,
  verifyRole("admin", "doctor"),
  getAppointmentById
);

router.put(
  "/:id",
  verifyToken,
  verifyRole("admin", "doctor"),
  updateAppointment
);
router.delete(
  "/appointments/:id",
  verifyToken,
  verifyRole("patient", "doctor", "admin"),
  deleteAppointment
);

export default router;
