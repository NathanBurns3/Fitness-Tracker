import dotenv from 'dotenv';
import path from 'path';

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
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(
  cors({
    origin: 'https://active-life-tracker.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
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
