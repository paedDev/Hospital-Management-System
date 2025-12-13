import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Appointment title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Patient is required"],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Doctor is required"],
    },
    appointmentDate: {
      type: Date,
      required: [true, "Appointment date is required"],
    },
    status: {
      type: String,
      enum: ["pending", "scheduled", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    doctorNotes: {
      type: String,
      maxlength: [500],
      default: "",
    },
    reason: {
      type: String,
      maxlength: [500],
      default: "",
    },
    cancelledBy: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded", "failed"],
      default: "pending",
    },
    cancellationReason: {
      type: String,
      maxlength: 200,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
