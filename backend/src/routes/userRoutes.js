import express from "express";
import {
  deleteUsers,
  getAllUsers,
  login,
  register,
  updateUsers,
} from "../controller/UserController.js";
import verifyToken from "../middleware/verifyToken.js";
import verifyRole from "../middleware/verifyRole.js";
const Router = express.Router();
// Public routes
Router.post("/register", register);
Router.post("/login", login);
Router.get("/users", verifyToken, verifyRole("admin"), getAllUsers);
Router.put("/users/:id", verifyToken, updateUsers);
Router.delete("/users/:id", verifyToken, verifyRole("admin"), deleteUsers);
export default Router;
