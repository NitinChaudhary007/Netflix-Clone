import express from "express";
import {
  deleteUser,
  login,
  logout,
  register,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/delete").post(deleteUser);

export default router;
