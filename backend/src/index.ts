import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import { port } from './config/env';
import homeRouter from './api/routes/homeRoutes';
import exerciseRouter from './api/routes/exerciseRoutes';
import mealRouter from './api/routes/mealRouter';
import settingsRouter from './api/routes/settingsRoutes';

const app = express();

app.use(bodyParser.json());

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
