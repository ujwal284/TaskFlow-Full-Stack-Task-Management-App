import { Router } from "express";
import {
  getAdminStats,
  getAllUsersByAdmin,
  getAllTasksByAdmin,
  deleteUserByAdmin,
  updateUserRoleByAdmin,
  deleteTaskByAdmin,
} from "../controllers/admin.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.use(verifyJWT, verifyAdmin);

router.get("/stats", getAdminStats);
router.get("/users", getAllUsersByAdmin);
router.get("/tasks", getAllTasksByAdmin);

router.patch("/users/:id/role", updateUserRoleByAdmin);
router.delete("/users/:id", deleteUserByAdmin);
router.delete("/tasks/:id", deleteTaskByAdmin);

export default router;