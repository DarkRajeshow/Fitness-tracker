import express from "express";
import {
  UserLogin,
  UserRegister,
  addWorkout,
  getUserDashboard,
  getWorkoutsByDate,
  getUserDashboard2,
  getDietsByDate,
  addDiet
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

router.get("/dashboard", verifyToken, getUserDashboard);
router.get("/workout", verifyToken, getWorkoutsByDate);
router.post("/workout", verifyToken, addWorkout);

router.get("/dashboard2", verifyToken, getUserDashboard2);
router.get("/diet", verifyToken, getDietsByDate);
router.post("/diet", verifyToken, addDiet);

export default router;
