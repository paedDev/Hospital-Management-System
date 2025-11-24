import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDb.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/auth/", userRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
