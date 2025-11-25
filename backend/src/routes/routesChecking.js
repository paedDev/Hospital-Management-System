import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import verifyRole from "../middleware/verifyRole.js";

const router = express.Router();

router.get("/admin", verifyToken, verifyRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/patient", verifyToken, verifyRole("patient"), (req, res) => {
  res.json({ message: "Welcome Patient!" });
});

export default router;
