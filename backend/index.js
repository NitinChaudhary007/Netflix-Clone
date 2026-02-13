import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/userRoute.js";

dotenv.config({
  path: ".env",
});

const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
databaseConnection();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// example
app.get("/", (req, res) => {
  res.status(200).json({
    message: "You hit the home route",
    success: true,
  });
});

// api -> https:localhost:8080/api/v1/user/register
app.use("/api/v1/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`listening at ${process.env.PORT}...`);
});
