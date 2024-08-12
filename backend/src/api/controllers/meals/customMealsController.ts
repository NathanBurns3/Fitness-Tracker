import { Request, Response } from 'express';
import mongoose from 'mongoose';
import CustomMeals from '../../models/db/customMeals';
import { ICustomMeal } from '../../models/api/meals/custom-meal';
import { AuthenticatedRequest } from '../../helpers/authMiddleware';

export const getCustomMeals = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    const customMeals = await CustomMeals.findOne({ userID });
    if (!customMeals) {
      return res
        .status(404)
        .json({ message: 'No custom meals found for this user.' });
    }

    const meals: ICustomMeal[] = customMeals.meals.map((meal) => {
      const totalServingSize = meal.food.reduce(
        (sum, food) => sum + food.servingSize,
        0
      );
      return {
        id: meal.mealID,
        name: meal.name,
        servingUnit: meal.servingUnit,
        servingSize: totalServingSize,
        food: meal.food.map((food) => ({
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
        })),
      };
    });

    return res.status(200).json(meals);
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getCustomMeal = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const { mealID } = req.params;
    if (
      !userID ||
      !mongoose.Types.ObjectId.isValid(userID) ||
      !mongoose.Types.ObjectId.isValid(mealID)
    ) {
      return res.status(400).json({ message: 'Invalid user ID or meal ID.' });
    }

    const customMeals = await CustomMeals.findOne(
      { userID, 'meals.mealID': mealID },
      { 'meals.$': 1 }
    );

    if (!customMeals || customMeals.meals.length === 0) {
      return res.status(404).json({ message: 'Meal not found.' });
    }

    return res.status(200).json(customMeals.meals[0]);
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message });
  }
};

export const addCustomMeal = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const { customMeal }: { customMeal: ICustomMeal } = req.body;
    if (!userID || !mongoose.Types.ObjectId.isValid(userID)) {
      return res
        .status(400)
        .json({ message: 'Invalid user ID.', success: false });
    }

    const userCustomMeals = await CustomMeals.findOne({ userID });
    if (userCustomMeals && userCustomMeals.meals.length >= 50) {
      return res.status(400).json({
        message: 'Maxed out the amount of custom meals!',
        success: false,
      });
    }

    const newCustomMeal: ICustomMeal = {
      id: new mongoose.Types.ObjectId(),
      name: customMeal.name,
      servingUnit: customMeal.servingUnit,
      servingSize: customMeal.servingSize,
      food: customMeal.food.map((food) => ({
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
      })),
    };

    const updatedCustomMeals = await CustomMeals.findOneAndUpdate(
      { userID },
      {
        $push: {
          meals: {
            mealID: newCustomMeal.id,
            name: newCustomMeal.name,
            servingUnit: newCustomMeal.servingUnit,
            foods: newCustomMeal.food,
          },
        },
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({ items: updatedCustomMeals, success: true });
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const updateCustomMeal = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const { mealID, customMeal }: { mealID: string; customMeal: ICustomMeal } =
      req.body;
    if (
      !userID ||
      !mongoose.Types.ObjectId.isValid(userID) ||
      !mongoose.Types.ObjectId.isValid(mealID)
    ) {
      return res.status(400).json({ message: 'Invalid ID.', success: false });
    }

    const updatedCustomMeals = await CustomMeals.findOneAndUpdate(
      { userID, 'meals.mealID': mealID },
      {
        $set: {
          'meals.$.name': customMeal.name,
          'meals.$.servingUnit': customMeal.servingUnit,
          'meals.$.foods': customMeal.food.map((food) => ({
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
          })),
        },
      },
      { new: true }
    );

    if (!updatedCustomMeals) {
      return res
        .status(404)
        .json({ message: 'No custom meal found.', success: false });
    }

    return res.status(200).json({ items: updatedCustomMeals, success: true });
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const deleteCustomMeal = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userID = req.user?.id;
    const { mealID } = req.params;
    if (
      !userID ||
      !mongoose.Types.ObjectId.isValid(userID) ||
      !mongoose.Types.ObjectId.isValid(mealID)
    ) {
      return res.status(400).json({ message: 'Invalid ID.', success: false });
    }

    const updatedCustomMeals = await CustomMeals.findOneAndUpdate(
      { userID },
      {
        $pull: { meals: { mealID } },
      },
      { new: true }
    );

    if (!updatedCustomMeals) {
      return res
        .status(404)
        .json({ message: 'No custom meal found.', success: false });
    }

    return res.status(200).json({ items: updatedCustomMeals, success: true });
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
