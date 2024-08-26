import { Request, Response } from 'express';
import {
  formatMealData,
  formatFoodNutritions,
} from '../../helpers/formatHelper';
import axios from 'axios';
import { IFood } from '../../models/api/meals/food';

const clientID = process.env.CLIENT_ID;

export const searchMeals = async (req: Request, res: Response) => {
  const meal = req.query.meal as string;
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${meal}&pageSize=10&requireAllWords=true`;
  try {
    const response = await axios.get(url, {
      headers: {
        'x-api-key': clientID,
      },
    });
    const meals = formatMealData(response.data);
    res.json(meals);
  } catch (error: Error | any) {
    res.status(500).send(error.message);
  }
};

export const updateNutritions = async (req: Request, res: Response) => {
  const meal = req.body as IFood;
  const url = `https://api.nal.usda.gov/fdc/v1/foods?fdcIds=${meal.fdcID}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'x-api-key': clientID,
      },
    });
    if (response.data[0] && response.data[0].labelNutrients) {
      formatFoodNutritions(response.data, meal);
    }
    res.json(meal);
  } catch (error: Error | any) {
    res.status(500).send(error.message);
  }
};
