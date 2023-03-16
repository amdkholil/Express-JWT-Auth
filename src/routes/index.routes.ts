import userController from "@/controllers/user.controller";
import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.post("/login", userController.login);
router.get("/refresh-token", userController.refreshToken);

router.use(authMiddleware);
router.get("/user", userController.getUsers);
router.delete("/logout", userController.logout);

export default router;
