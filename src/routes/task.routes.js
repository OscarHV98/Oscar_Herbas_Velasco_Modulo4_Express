import { Router } from "express";
import taskController from "../controllers/task.controller.js";
import { authenticateToken } from "../middlewares/autenticate.midleware.js";

const router = Router();

router.route('/')
    .get(taskController.getTasks)
    .post(taskController.createTask);

router.route('/:id')
    .get(taskController.getTask)
    .put(taskController.updateTask)
    .patch(taskController.taskDone)
    .delete(taskController.deleteTask);

export default router;