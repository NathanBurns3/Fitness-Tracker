import express from 'express';
import {
  addExercise,
  deleteExercise,
  getExerciseExist,
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

exerciseRouter.get('/exercises', verifyToken, getExercises);
exerciseRouter.get('/exerciseExist', verifyToken, getExerciseExist);
exerciseRouter.post('/addExercise', verifyToken, addExercise);
exerciseRouter.delete('/deleteExercise', verifyToken, deleteExercise);
exerciseRouter.get('/dailyExercises', verifyToken, getDailyExercises);
exerciseRouter.post('/addDailyExercise', verifyToken, addDailyExercise);
exerciseRouter.put('/updateDailyExercise', verifyToken, updateDailyExercise);
exerciseRouter.delete('/deleteDailyExercise', verifyToken, deleteDailyExercise);

export default exerciseRouter;
