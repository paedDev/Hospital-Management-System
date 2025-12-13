import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, // true only if you use port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBookingEmail = async (appointment) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: appointment.patient.email,
    subject: `Appointment Confirmed - ${appointment.title}`,
    html: `
      <h2>Appointment Confirmed! 🎉</h2>
      <p><strong>Title:</strong> ${appointment.title}</p>
      <p><strong>Doctor:</strong> Dr. ${appointment.doctor.firstName} ${
      appointment.doctor.lastName
    }</p>
      <p><strong>Date:</strong> ${new Date(
        appointment.appointmentDate
      ).toLocaleDateString()}</p>
      <p><strong>Status:</strong> ${appointment.status}</p>
      <hr>
      <p>Thank you for booking with us!</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};
export const sendCancellationEmail = async (appointment, reason) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: appointment.patient.email,
    subject: `Appointment Cancelled - ${appointment.title}`,
    html: `
      <h2>Appointment Cancelled 😔</h2>
      <p><strong>Reason:</strong> ${reason || "No reason provided"}</p>
      <p>Book a new appointment anytime!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
