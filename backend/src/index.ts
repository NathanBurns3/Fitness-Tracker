import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import express from 'express';
import connectDB from './config/db';
import { port } from './config/env';
import homeRouter from './api/routes/homeRoutes';
import exerciseRouter from './api/routes/exerciseRoutes';
import mealRouter from './api/routes/mealRouter';
import settingsRouter from './api/routes/settingsRoutes';
import cors from 'cors';
import './api/helpers/scheduler';
import authRouter from './api/routes/authRoutes';
import rateLimit from 'express-rate-limit';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/auth/signup', authLimiter);
app.use('/auth/login', authLimiter);
app.use('/auth/logout', authLimiter);
app.use('/auth/user', authLimiter);
app.use('/auth/request-password-reset', authLimiter);
app.use('/auth/reset-password', authLimiter);
app.use('/auth/complete-registration', authLimiter);

app.use(helmet());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const allowedOrigins = [
  'https://active-life-tracker.vercel.app',
  'http://localhost:4200',
  'https://www.activelifetracker.com',
  'https://activelifetracker.com',
];

app.use((req, res, next) => {
  // If origin is undefined, try to extract from referer
  if (!req.headers.origin && req.headers.referer) {
    try {
      const refererUrl = new URL(req.headers.referer);
      req.headers.origin = `${refererUrl.protocol}//${refererUrl.host}`;
      console.log('Extracted origin from referer:', req.headers.origin);
    } catch (e) {
      console.error('Failed to extract origin from referer:', e);
    }
  }
  next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      console.log('CORS Request from origin:', origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error('CORS BLOCKED - Origin not in allowedOrigins:', origin);
        console.error('Allowed origins:', allowedOrigins);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
);

connectDB();

app.use('/home', homeRouter);
app.use('/exercise', exerciseRouter);
app.use('/meal', mealRouter);
app.use('/settings', settingsRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  console.log('Root endpoint hit');
  res.send('API Running');
});

app.listen(port, () => console.log(`Server started on port ${port}`));
