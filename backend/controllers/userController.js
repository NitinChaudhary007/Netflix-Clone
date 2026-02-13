import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/userModel.js";

const SECRET_KEY = "qwertyuioplkjhgfdsazxcvbnm";

export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "Invalid input",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "email already registered",
        success: false,
      });
    }

    const hasdedPassword = await bcrypt.hash(password, 16);
    await User.create({
      fullname: fullname,
      email: email,
      password: hasdedPassword,
    });

    return res.status(201).json({
      message: "Account successfully created",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid data",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email not registered.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      .json({
        message: "Login successfully",
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { expires: new Date(0), httpOnly: true })
      .json({
        message: "Logout successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid data",
        status: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid data",
        status: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    await User.findOneAndDelete({ email });

    return res.status(200).json({
      message: "user account delete successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
