import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import colors from "colors";
import mongoose from "mongoose";
import connectDB from "./connectDB.js";
import userRouter from "./routers/userRouter.js";
import taskRouter from "./routers/taskRouter.js";

dotenv.config();

const app = express();
// const port = process.env.PORT ?? 3001;
const port = process.env.PORT || 3001;

(async () => {
  try {
    await connectDB(mongoose);

    app.use(express.json());
    app.use(morgan("dev"));
    app.use(cors());

    app.get("/", async(req, res) => {
      res.send("Welcome to the API");
    });
    app.use("/api/v1",userRouter())
    app.use("/api/v1",taskRouter())
    app.listen(port, () =>
      console.log(`Server running successfully on ${port}`.bgGreen.white)
    );
  } catch (error) {
    console.error("Server failed to start", error);
  }
})();
