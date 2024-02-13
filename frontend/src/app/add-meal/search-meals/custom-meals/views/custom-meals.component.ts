import { Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/add-meal/models/food';
import { CustomMealService } from '../services/custom-meals.service';

@Component({
  selector: 'custom-meals',
  templateUrl: './custom-meals.component.html',
})
export class CustomMealsComponent implements OnInit {
  customMeals: IFood[] = [];

  constructor(private customMealService: CustomMealService) {}

  ngOnInit(): void {
    this.customMeals = this.customMealService.getCustomMeals();
  }

  addCustomMeal(): void {
    console.log('Add custom meal');
  }
}
