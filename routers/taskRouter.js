import express from "express";
import taskController from "../controllers/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

const taskRouter = () => {
  router.post("/task", (req, res) => taskController.createTask(req, res));
  router.get("/task", (req, res) => taskController.getAllTasks(req, res));
  router.get("/task/:id", (req, res) => taskController.getTaskById(req, res));
  router.put("/task/:id", (req, res) => taskController.updateTask(req, res));
  router.delete("/task/:id", (req, res) => taskController.deleteTask(req, res));
  // router.get("/task/getTasksByUser/:id",authMiddleware, (req, res) => taskController.getTasksByUser(req, res));
  router.post("/task/getTasksByUser",authMiddleware, (req, res) => taskController.getTasksByUser(req, res));

  return router;
};

export default taskRouter;
