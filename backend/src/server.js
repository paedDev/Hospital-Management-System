import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDb.js";
import userRoutes from "./routes/userRoutes.js";
import routesChecking from "./routes/routesChecking.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000" || process.env.FE_URL,
  })
);
app.use(express.json());

app.use("/api/auth/", userRoutes);
app.use("/api/", routesChecking);
app.use("/api/appointment/", appointmentRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
