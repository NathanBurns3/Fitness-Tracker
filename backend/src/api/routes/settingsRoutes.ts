import express from 'express';
import {
  getUserSettings,
  updatePassword,
  updateUserSettings,
} from '../controllers/settings/settingsController';
import { verifyToken } from '../helpers/authMiddleware';

const settingsRouter = express.Router();

settingsRouter.get('/userSettings', verifyToken, getUserSettings);
settingsRouter.put('/updateUserSettings', verifyToken, updateUserSettings);
settingsRouter.put('/updatePassword', verifyToken, updatePassword);

export default settingsRouter;
