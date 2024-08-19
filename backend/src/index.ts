import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db';
import { port } from './config/env';
import homeRouter from './api/routes/homeRoutes';
import exerciseRouter from './api/routes/exerciseRoutes';
import mealRouter from './api/routes/mealRouter';
import settingsRouter from './api/routes/settingsRoutes';
import cors from 'cors';

const app = express();

// Nathan: Adjust
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(
  cors({
    origin: 'http://localhost:4200', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

connectDB();

app.use('/home', homeRouter);
app.use('/exercise', exerciseRouter);
app.use('/meal', mealRouter);
app.use('/settings', settingsRouter);

app.get('/', (req, res) => {
  console.log('Root endpoint hit');
  res.send('API Running');
});

app.listen(port, () => console.log(`Server started on port ${port}`));
