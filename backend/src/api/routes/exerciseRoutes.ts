import express from 'express';
import {
  addExercise,
  deleteExercise,
  getExercises,
} from '../controllers/exercise/exercisesController';
import {
  addDailyExercise,
  deleteDailyExercise,
  getDailyExercises,
  updateDailyExercise,
} from '../controllers/exercise/dailyExerciseController';
import { verifyToken } from '../helpers/authMiddleware';

const exerciseRouter = express.Router();

exerciseRouter.get('/exercises/:muscleGroup', verifyToken, getExercises);
exerciseRouter.post('/addExercise', verifyToken, addExercise);
exerciseRouter.delete(
  '/deleteExercise/:muscleGroup/:exerciseID',
  verifyToken,
  deleteExercise
);
exerciseRouter.get('/dailyExercises', verifyToken, getDailyExercises);
exerciseRouter.post('/addDailyExercise', verifyToken, addDailyExercise);
exerciseRouter.put('/updateDailyExercise', verifyToken, updateDailyExercise);
exerciseRouter.delete(
  '/deleteDailyExercise/:exerciseID',
  verifyToken,
  deleteDailyExercise
);

export default exerciseRouter;
