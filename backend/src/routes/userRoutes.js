import express from "express";
import { login, register } from "../controller/UserController.js";

const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);

export default Router;
