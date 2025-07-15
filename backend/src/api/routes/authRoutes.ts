import express from 'express';
import {
  completeRegistration,
  getUser,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
  signup,
  verifyEmail,
} from '../controllers/authentication/authController';
import { verifyToken } from '../helpers/authMiddleware';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.get('/user', verifyToken, getUser);
authRouter.get('/verify-email', verifyEmail);
authRouter.post('/complete-registration', completeRegistration);
authRouter.post('/request-password-reset', requestPasswordReset);
authRouter.post('/reset-password', resetPassword);

export default authRouter;
