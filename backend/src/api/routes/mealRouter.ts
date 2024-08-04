import express from 'express';
import {
  addDailyFood,
  deleteDailyFood,
  getDailyFoods,
  updateDailyFood,
} from '../controllers/meals/dailyFoodController';
import {
  addFavoriteMeal,
  deleteFavoriteMeal,
  getFavoriteMeals,
  getFavoriteMealsLimit,
} from '../controllers/meals/favoriteMealsController';
import {
  addCustomMeal,
  deleteCustomMeal,
  getCustomMeal,
  getCustomMeals,
  updateCustomMeal,
} from '../controllers/meals/customMealsController';
import {
  searchMeals,
  updateNutritions,
} from '../controllers/meals/foodLookupController';
import { verifyToken } from '../helpers/authMiddleware';

const mealRouter = express.Router();

mealRouter.get('/dailyFoods', verifyToken, getDailyFoods);
mealRouter.post('/addDailyFood', verifyToken, addDailyFood);
mealRouter.put('/updateDailyFood', verifyToken, updateDailyFood);
mealRouter.delete('/deleteDailyFood/:fdcID', verifyToken, deleteDailyFood);
mealRouter.get('/favoriteMeals', verifyToken, getFavoriteMeals);
mealRouter.post('/addFavoriteMeal', verifyToken, addFavoriteMeal);
mealRouter.delete(
  '/deleteFavoriteMeal/:fdcID',
  verifyToken,
  deleteFavoriteMeal
);
mealRouter.get('/favoriteMealsLimit', verifyToken, getFavoriteMealsLimit);
mealRouter.get('/customMeals', verifyToken, getCustomMeals);
mealRouter.get('/customMeal/:mealID', verifyToken, getCustomMeal);
mealRouter.post('/addCustomMeal', verifyToken, addCustomMeal);
mealRouter.put('/updateCustomMeal', verifyToken, updateCustomMeal);
mealRouter.delete('/deleteCustomMeal/:mealID', verifyToken, deleteCustomMeal);
mealRouter.get('/searchFoods', verifyToken, searchMeals);
mealRouter.put('/updateNutritions', verifyToken, updateNutritions);

export default mealRouter;
