import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
// console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
// console.log("EMAIL_USER (SMTP Login):", process.env.EMAIL_USER);
// console.log("EMAIL_SENDER (Validated From):", process.env.EMAIL_SENDER); // Added log for debug
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, // TLS will be used automatically on port 587
  auth: {
    user: process.env.EMAIL_USER, // Brevo SMTP Login
    pass: process.env.EMAIL_PASS, // Brevo SMTP Key
  },
});

export const sendBookingEmail = async (appointment) => {
  console.log("sendBookingEmail TO:", appointment.patient?.email);

  const mailOptions = {
    from: process.env.EMAIL_SENDER, // "Clinic <jannoelpaed17@gmail.com>"
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

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      `Booking email sent successfully to ${appointment.patient.email}`
    );
  } catch (error) {
    console.error(
      "NODEMAILER ERROR (sendBookingEmail): Failed to send email.",
      error
    );
    throw error;
  }
};

export const sendCancellationEmail = async (appointment, reason) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: appointment.patient.email,
    subject: `Appointment Cancelled - ${appointment.title}`,
    html: `
      <h2>Appointment Cancelled 😔</h2>
      <p><strong>Reason:</strong> ${reason || "No reason provided"}</p>
      <p>Book a new appointment anytime!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      `Cancellation email sent successfully to ${appointment.patient.email}`
    );
  } catch (error) {
    console.error(
      "NODEMAILER ERROR (sendCancellationEmail): Failed to send email.",
      error
    );
    throw error;
  }
};
