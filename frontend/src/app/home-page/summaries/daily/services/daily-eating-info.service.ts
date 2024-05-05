import { Injectable } from '@angular/core';
import { IDailyEatingInfo } from '../models/daily-eating-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserSettings } from 'src/app/user-settings/models/user-settings';
import { ActivityLevelEnum } from 'src/app/user-settings/models/activity-level-enum';
import { WeightGoalEnum } from 'src/app/user-settings/models/weight-goal-enum';

@Injectable({
  providedIn: 'root',
})
export class DailyEatingInfoService {
  private rapidAPIKey: string = 'RAPID API KEY HERE';
  private rapidAPIHost: string = 'RAPID API HOST HERE';

  eatingInfo: IDailyEatingInfo = {
    goals: {
      caloriesGoal: 3200,
      proteinGoal: 175,
      carbsGoal: 210,
      fatGoal: 100,
      fiberGoal: 70,
      sugarGoal: 2750,
    },
    totals: {
      calories: 4000,
      protein: 150,
      carbs: 200,
      fat: 50,
      fiber: 30,
      sugar: 2300,
    },
  };

  constructor(private http: HttpClient) {}

  getDailyEatingInfo(): IDailyEatingInfo {
    return this.eatingInfo;
  }

  calculateMacros(settings: IUserSettings) {
    const age: number = settings.personalInformation.age;
    const gender: string = settings.personalInformation.gender.toLowerCase();
    const heightInCentimeters: number =
      settings.physicalMeasurements.height * 2.54;
    const weightInKilograms: number =
      settings.physicalMeasurements.weight * 0.453592;
    const activityLevel: ActivityLevelEnum = settings.activityGoal.Activity;
    const goal: WeightGoalEnum = settings.activityGoal.WeightGoal;
    const diet: string = settings.dietPlan;

    const url = `https://fitness-calculator.p.rapidapi.com/macrocalculator?age=${age}&gender=${gender}&height=${heightInCentimeters}&weight=${weightInKilograms}&activitylevel=${activityLevel}&goal=${goal}`;

    const headers = new HttpHeaders({
      'x-rapidapi-key': this.rapidAPIKey,
      'x-rapidapi-host': this.rapidAPIHost,
    });

    return this.http
      .get(url, { headers })
      .toPromise()
      .then((data: any) => this.formatData(data, diet));
  }

  private formatData(data: any, diet: string): void {
    let dietData = data.data[diet];

    let calories = data.data.calorie;
    let protein = dietData.protein;
    let carbs = dietData.carbs;
    let fat = dietData.fat;

    this.updateDailyEatingGoals(calories, protein, carbs, fat);
  }

  updateDailyEatingGoals(
    calories: number,
    protein: number,
    carbs: number,
    fat: number
  ): void {
    this.eatingInfo.goals.caloriesGoal = calories;
    this.eatingInfo.goals.proteinGoal = protein;
    this.eatingInfo.goals.carbsGoal = carbs;
    this.eatingInfo.goals.fatGoal = fat;
    this.eatingInfo.goals.fiberGoal = (calories / 1000) * 14;
    this.eatingInfo.goals.sugarGoal = calories * 0.08;
  }
}
