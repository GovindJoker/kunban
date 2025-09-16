import express from "express";
import {
  addTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/add", addTask);
router.get("/get", getTasks);
router.get("/get/:id", getTaskById);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);
router.put("/update-status/:id", updateStatus);

export default router;
