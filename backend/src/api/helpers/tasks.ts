import DailyInfo from '../models/db/dailyInfo';
import MonthlyInfo from '../models/db/monthlyInfo';
import YearlyInfo from '../models/db/yearlyInfo';
import Goals from '../models/db/goals';
import mongoose from 'mongoose';

async function clearDailyInfo(userID: mongoose.Types.ObjectId) {
  console.log(`Clearing daily info for user: ${userID}`);
  await DailyInfo.updateMany(
    { userID },
    { $set: { foods: [], exercisesCompleted: [] } }
  );
  console.log(`Daily info cleared for user: ${userID}`);
}

async function updateMonthlyInfo(userID: mongoose.Types.ObjectId) {
  console.log(`Updating monthly info for user: ${userID}`);
  const dailyInfo = await DailyInfo.findOne({ userID }).lean();
  if (!dailyInfo) {
    console.log(`No daily info found for user: ${userID}`);
    return;
  }

  let monthlyInfo = await MonthlyInfo.findOne({ userID });
  if (!monthlyInfo) {
    monthlyInfo = new MonthlyInfo({ userID, sets: [], goalsCompleted: [] });
    console.log(`Created new monthly info for user: ${userID}`);
  }

  if (!monthlyInfo.sets) {
    monthlyInfo.sets = [];
  }

  if (!monthlyInfo.goalsCompleted) {
    monthlyInfo.goalsCompleted = [];
  }

  dailyInfo.exercisesCompleted.forEach((exercise) => {
    const muscleGroup = exercise.muscleGroup;
    const sets = exercise.sets;
    const muscleGroupInfo = monthlyInfo.sets.find(
      (set) => set.muscleGroup === muscleGroup
    );
    if (muscleGroupInfo) {
      muscleGroupInfo.sets += sets;
    } else {
      monthlyInfo.sets.push({ muscleGroup, sets });
    }
  });

  const goals = await Goals.findOne({ userID }).lean();
  if (!goals) {
    console.log(`No goals found for user: ${userID}`);
    return;
  }

  const totalNutrition = dailyInfo.foods.reduce(
    (acc, food) => {
      acc.calories += food.nutritions.calories;
      acc.protein += food.nutritions.protein;
      acc.carbs += food.nutritions.carbs;
      acc.fat += food.nutritions.fat;
      acc.fiber += food.nutritions.fiber;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  const withinGoal = (goal: number, total: number) =>
    Math.abs(goal - total) / goal <= 0.05;

  const eatingGoalMet =
    withinGoal(goals.foodGoals.calories, totalNutrition.calories) &&
    withinGoal(goals.foodGoals.protein, totalNutrition.protein) &&
    withinGoal(goals.foodGoals.carbs, totalNutrition.carbs) &&
    withinGoal(goals.foodGoals.fat, totalNutrition.fat) &&
    withinGoal(goals.foodGoals.fiber, totalNutrition.fiber);

  const exerciseGoalMet = dailyInfo.exercisesCompleted.length > 0;

  monthlyInfo.goalsCompleted.push({
    day: new Date(),
    exerciseGoal: exerciseGoalMet,
    eatingGoal: eatingGoalMet,
  });

  await monthlyInfo.save();
  console.log(`Monthly info updated for user: ${userID}`);
}

async function updateYearlyInfo(userID: mongoose.Types.ObjectId) {
  const monthlyInfo = await MonthlyInfo.findOne({ userID }).lean();
  if (!monthlyInfo) {
    console.log(`No monthly info found for user: ${userID}`);
    return;
  }

  let yearlyInfo = await YearlyInfo.findOne({ userID });
  if (!yearlyInfo) {
    yearlyInfo = new YearlyInfo({ userID, month: [] });
    console.log(`Created new yearly info for user: ${userID}`);
  }

  if (!yearlyInfo.month) {
    yearlyInfo.month = [];
  }

  const currentMonth = new Date().getMonth();
  const monthInfo = yearlyInfo.month.find((m) => m.month === currentMonth);

  const exerciseGoalsCompleted = monthlyInfo.goalsCompleted.filter(
    (goal) => goal.exerciseGoal
  ).length;
  const eatingGoalsCompleted = monthlyInfo.goalsCompleted.filter(
    (goal) => goal.eatingGoal
  ).length;

  if (monthInfo) {
    monthInfo.exerciseGoalsCompleted = exerciseGoalsCompleted;
    monthInfo.eatingGoalsCompleted = eatingGoalsCompleted;
    console.log(`Updated existing month info for month: ${currentMonth}`);
  } else {
    yearlyInfo.month.push({
      month: currentMonth,
      exerciseGoalsCompleted,
      eatingGoalsCompleted,
    });
    console.log(`Added new month info for month: ${currentMonth}`);
  }

  await yearlyInfo.save();
  console.log(`Yearly info updated for user: ${userID}`);
}

async function updateStreaks(userID: mongoose.Types.ObjectId) {
  console.log(`Updating streaks for user: ${userID}`);
  const goals = await Goals.findOne({ userID });
  if (!goals) {
    console.log(`No goals found for user: ${userID}`);
    return;
  }

  const monthlyInfo = await MonthlyInfo.findOne({ userID }).lean();
  if (!monthlyInfo) {
    console.log(`No monthly info found for user: ${userID}`);
    return;
  }

  const todayGoals = monthlyInfo.goalsCompleted.find(
    (goal) => goal.day.toDateString() === new Date().toDateString()
  );
  if (!todayGoals) {
    console.log(`No goals found for today for user: ${userID}`);
    return;
  }

  if (todayGoals.exerciseGoal) {
    goals.exerciseStreak += 1;
  } else {
    goals.exerciseStreak = 0;
  }

  if (todayGoals.eatingGoal) {
    goals.eatingGoalStreak += 1;
  } else {
    goals.eatingGoalStreak = 0;
  }

  await goals.save();
  console.log(`Streaks updated for user: ${userID}`);
}

async function dailyTask() {
  console.log('Running daily task...');
  try {
    const users = await Goals.find().distinct('userID');
    for (const userID of users) {
      await updateMonthlyInfo(userID);
      await updateYearlyInfo(userID);
      await updateStreaks(userID);
      await clearDailyInfo(userID);
    }
    console.log('Daily task completed.');
  } catch (err) {
    console.error('Error in daily task:', err);
  }
}

async function monthlyTask() {
  const users = await Goals.find().distinct('userID');
  for (const userID of users) {
    await MonthlyInfo.updateMany(
      { userID },
      { $set: { sets: [], goalsCompleted: [] } }
    );
  }
}

async function yearlyTask() {
  const users = await Goals.find().distinct('userID');
  for (const userID of users) {
    await YearlyInfo.updateMany({ userID }, { $set: { month: [] } });
  }
}

export { dailyTask, monthlyTask, yearlyTask };
