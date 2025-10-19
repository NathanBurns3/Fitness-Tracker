import express from 'express';
import { getProfileInfo } from '../controllers/home/profileController';
import {
  getDailyEatingInfo,
  getDailyExerciseInfo,
  updateTrackedNutritions,
} from '../controllers/home/dailyInfoController';
import {
  getMonthlyBreakdownInfo,
  getMonthlyExerciseInfo,
} from '../controllers/home/monthlyInfoController';
import {
  getYearlyEatingGoals,
  getYearlyExerciseGoals,
} from '../controllers/home/yearlyInfoController';
import { verifyToken } from '../helpers/authMiddleware';

const homeRouter = express.Router();

homeRouter.get('/profile', verifyToken, getProfileInfo);
homeRouter.get('/dailyEatingInfo', verifyToken, getDailyEatingInfo);
homeRouter.get('/dailyExerciseInfo', verifyToken, getDailyExerciseInfo);
homeRouter.get('/monthlyExerciseInfo', verifyToken, getMonthlyExerciseInfo);
homeRouter.get('/monthlyBreakdownInfo', verifyToken, getMonthlyBreakdownInfo);
homeRouter.get('/yearlyEatingGoals', verifyToken, getYearlyEatingGoals);
homeRouter.get('/yearlyExerciseGoals', verifyToken, getYearlyExerciseGoals);
homeRouter.put(
  '/dailyEatingInfo/trackedNutritions',
  verifyToken,
  updateTrackedNutritions
);

export default homeRouter;
