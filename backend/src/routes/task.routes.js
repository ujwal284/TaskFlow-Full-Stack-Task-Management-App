import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,

} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createTask).get(getAllTasks);
router.route("/stats").get(getTaskStats);
router.route("/:id").get(getTaskById).patch(updateTask).delete(deleteTask);

export default router;