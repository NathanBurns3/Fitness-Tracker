import express from 'express';
import {
  getUserSettings,
  updateUserSettings,
} from '../controllers/settings/settingsController';
import { verifyToken } from '../helpers/authMiddleware';

const settingsRouter = express.Router();

settingsRouter.get('/userSettings', verifyToken, getUserSettings);
settingsRouter.put('/updateUserSettings', verifyToken, updateUserSettings);

export default settingsRouter;
