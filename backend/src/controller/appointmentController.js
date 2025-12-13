import Appointment from "../model/Appointment.js";
import User from "../model/User.js";
import {
  sendBookingEmail,
  sendCancellationEmail,
} from "../utils/emailService.js";
//CRUD

// Create
export const createAppointment = async (req, res) => {
  try {
    const { title, doctor, appointmentDate, reason } = req.body;
    const patientId = req.user.userId;
    if (!title || !doctor || !appointmentDate || !reason) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const doctorUser = await User.findById(doctor);
    if (!doctorUser || doctorUser.role !== "doctor") {
      return res.status(400).json({ message: "Invalid doctor selected" });
    }
    // 2 ways

    //  const appointment = new Appointment({
    //   title,
    //   patient: patientId,
    //   doctor,
    //   appointmentDate,
    //   reason: reason || "",
    //   status: "pending",
    //   paymentStatus: "pending",
    // });
    // await appointment.save()
    const appointment = await Appointment.create({
      title,
      patient: patientId,
      doctor,
      appointmentDate,
      reason: reason || "",
      status: "pending",
      paymentStatus: "pending",
    });
    const populated = await Appointment.findById(appointment._id)
      .populate("doctor", "firstName lastName email")
      .populate("patient", "firstName lastName email");

    await sendBookingEmail(populated);

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: populated,
    });
  } catch (error) {
    console.error("Create appointment error:", error);
    res
      .status(500)
      .json({ message: "Error creating appointment", error: error.message });
  }
};
// Role based their own only : admin all of them
export const getAppointments = async (req, res) => {
  try {
    const userId = req.user.userId;
    const role = req.user.role;
    const { status } = req.query;
    const filter = {};

    if (role === "patient") {
      filter.patient = userId;
    } else if (role === "doctor") {
      filter.doctor = userId;
    }
    if (status) {
      filter.status = status;
    }

    const appointments = await Appointment.find(filter)
      .populate("doctor", "firstName lastName email role")
      .populate("patient", "firstName lastName email role")
      .sort({
        appointmentDate: -1,
      });
    res.status(200).json({
      message: "Appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    console.error("Get appointments error:", error);
    res
      .status(500)
      .json({ message: "Error fetching appointments", error: error.message });
  }
};
//Get their own appointment
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const role = req.user.role;

    const appointment = await Appointment.findById(id)
      .populate("doctor", "firstName lastName email")
      .populate("patient", "firstName lastName email");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }
    if (role === "patient" && appointment.patient._id.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }
    if (role === "doctor" && appointment.doctor._id.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.status(200).json({
      message: "Appointment fetched successfully",
      appointment,
    });
  } catch (error) {
    console.error("Get appointment error:", error);
    res.status(500).json({
      message: "Error fetching appointment",
      error: error.message,
    });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const role = req.user.role;
    const { status, doctorNotes, paymentStatus, reason, cancellationReason } =
      req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    if (role === "patient" && appointment.patient.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }
    // if (role === "doctor" && appointment.doctor.toString() !== userId) {
    //   return res.status(403).json({ message: "Access denied" });
    // }

    const updates = {};
    if (role === "patient" && reason !== undefined) {
      updates.reason = reason;
    }

    if (role === "doctor" || role === "admin") {
      if (status) updates.status = status;
      if (doctorNotes !== undefined) updates.doctorNotes = doctorNotes;
      if (paymentStatus) updates.paymentStatus = paymentStatus;
    }

    if (status === "cancelled") {
      updates.status = "cancelled";
      updates.cancelledBy = role;
      if (cancellationReason) updates.cancellationReason = cancellationReason;
    }

    const updated = await Appointment.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("doctor", "firstName lastName email role")
      .populate("patient", "firstName lastName email role");
    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: updated,
    });
  } catch (error) {
    console.error("Update appointment error:", error);
    res.status(500).json({
      message: "Error updating appointment",
      error: error.message,
    });
  }
};
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.user.role;
    const userId = req.user.userId;

    const appointment = await Appointment.findById(id).populate(
      "patient",
      "email firstName lastName"
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    // Patient can only delete own appointment
    if (role === "patient" && appointment.patient.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Optional: send cancellation email before deleting
    if (appointment.patient?.email) {
      await sendCancellationEmail(
        appointment,
        appointment.cancellationReason || "Cancelled by user"
      );
    }

    await Appointment.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("Delete appointment error", error);
    res.status(500).json({
      message: "Error deleting appointment",
      error: error.message,
    });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" })
      .select("-password")
      .sort({
        firstName: 1,
        lastName: 1,
      });
    res.status(200).json({
      doctors,
      message: "Fetched all doctor",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
