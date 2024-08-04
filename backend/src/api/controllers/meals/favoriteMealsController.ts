import { Request, Response } from 'express';
import mongoose from 'mongoose';
import FavoriteFoods from '../../models/db/favoriteFoods';
import { IFood } from '../../models/api/meals/food';
import { AuthenticatedRequest } from '../../helpers/authMiddleware';

export const getFavoriteMeals = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    const favoriteMeals = await FavoriteFoods.findOne({ userID: userID });
    if (!favoriteMeals) {
      return res
        .status(404)
        .json({ message: 'No favorite meals found for this user.' });
    }

    const foods: IFood[] = favoriteMeals.foods.map((food) => ({
      fdcID: food.fdcID,
      description: food.description,
      brandName: food.brandName,
      servingSize: food.servingSize,
      servingUnit: food.servingUnit,
      packageWeight: food.packageWeight || '',
      ingredients: food.ingredients,
      nutritions: {
        calories: food.nutritions.calories,
        protein: food.nutritions.protein,
        carbs: food.nutritions.carbs,
        fat: food.nutritions.fat,
        fiber: food.nutritions.fiber,
      },
    }));
    return res.status(200).json(foods);
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message });
  }
};

export const addFavoriteMeal = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const { food }: { food: IFood } = req.body;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res
        .status(400)
        .json({ message: 'Invalid user ID.', success: false });
    }

    const userFavoriteMeals = await FavoriteFoods.findOne({ userID });
    if (userFavoriteMeals) {
      if (userFavoriteMeals.foods.length >= 50) {
        return res.status(400).json({
          message: 'Maxed out the amount of favorite meals!',
          success: false,
        });
      }

      const isDuplicate = userFavoriteMeals.foods.some(
        (meal) => meal.fdcID === food.fdcID
      );
      if (isDuplicate) {
        return res.status(400).json({
          message: food.description + ' is already in the favorites!',
          success: false,
        });
      }
    }

    const newFood: IFood = {
      fdcID: food.fdcID,
      description: food.description,
      brandName: food.brandName,
      servingSize: food.servingSize,
      servingUnit: food.servingUnit,
      packageWeight: food.packageWeight || '',
      ingredients: food.ingredients,
      nutritions: {
        calories: food.nutritions.calories,
        protein: food.nutritions.protein,
        carbs: food.nutritions.carbs,
        fat: food.nutritions.fat,
        fiber: food.nutritions.fiber,
      },
    };

    const updatedFavoriteMeals = await FavoriteFoods.findOneAndUpdate(
      { userID: userID },
      { $push: { foods: newFood } },
      { new: true, upsert: true }
    );

    return res.status(200).json({ items: updatedFavoriteMeals, success: true });
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const deleteFavoriteMeal = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const { fdcID } = req.params;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res
        .status(400)
        .json({ message: 'Invalid user ID.', success: false });
    }

    const updatedFavoriteMeals = await FavoriteFoods.findOneAndUpdate(
      { userID: userID },
      { $pull: { foods: { fdcID: fdcID } } },
      { new: true }
    );

    if (!updatedFavoriteMeals) {
      return res
        .status(404)
        .json({ message: 'Food not found.', success: false });
    }

    res.status(200).json({ items: updatedFavoriteMeals.foods, success: true });
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
