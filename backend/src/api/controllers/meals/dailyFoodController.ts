import { Request, Response } from 'express';
import mongoose from 'mongoose';
import DailyInfo from '../../models/db/dailyInfo';
import { IFood } from '../../models/api/meals/food';
import { AuthenticatedRequest } from '../../helpers/authMiddleware';

export const getDailyFoods = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    const dailyInfo = await DailyInfo.findOne({ userID: userID });
    if (!dailyInfo) {
      return res
        .status(404)
        .json({ message: 'No daily meals found for this user.' });
    }

    const foods: IFood[] = dailyInfo.foods.map((food) => ({
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

export const addDailyFood = async (
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

    const userDailyFood = await DailyInfo.findOne({ userID: userID });
    if (userDailyFood && userDailyFood.foods.length >= 50) {
      return res.status(400).json({
        message: 'Maxed out the amount of meals for the day!',
        success: false,
      });
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

    const updatedDailyFoods = await DailyInfo.findOneAndUpdate(
      { userID: userID },
      {
        $push: { foods: newFood },
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ items: updatedDailyFoods.foods, success: true });
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const updateDailyFood = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const { fdcID, food }: { fdcID: number; food: IFood } = req.body;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res
        .status(400)
        .json({ message: 'Invalid user ID.', success: false });
    }

    const updatedDailyFoods = await DailyInfo.findOneAndUpdate(
      { userID: userID, 'foods.fdcID': fdcID },
      {
        $set: {
          'foods.$.description': food.description,
          'foods.$.brandName': food.brandName,
          'foods.$.servingSize': food.servingSize,
          'foods.$.servingUnit': food.servingUnit,
          'foods.$.packageWeight': food.packageWeight || '',
          'foods.$.ingredients': food.ingredients,
          'foods.$.nutritions': {
            calories: food.nutritions.calories,
            protein: food.nutritions.protein,
            carbs: food.nutritions.carbs,
            fat: food.nutritions.fat,
            fiber: food.nutritions.fiber,
          },
        },
      },
      { new: true }
    );

    if (!updatedDailyFoods) {
      return res
        .status(404)
        .json({ message: 'Food not found.', success: false });
    }

    res.status(200).json({ items: updatedDailyFoods.foods, success: true });
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const deleteDailyFood = async (
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

    const updatedDailyFoods = await DailyInfo.findOneAndUpdate(
      { userID: userID },
      {
        $pull: { foods: { fdcID: fdcID } },
      },
      { new: true }
    );

    if (!updatedDailyFoods) {
      return res
        .status(404)
        .json({ message: 'Food not found.', success: false });
    }

    res.status(200).json({ items: updatedDailyFoods.foods, success: true });
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
