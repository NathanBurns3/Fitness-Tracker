import express from 'express';
import {
  getUser,
  login,
  logout,
  signup,
} from '../controllers/authentication/authController';
import { verifyToken } from '../helpers/authMiddleware';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.get('/user', verifyToken, getUser);

export default authRouter;
