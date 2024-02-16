import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMealComponent } from './views/add-meal.component';
import { SearchMealsComponent } from './search-meals/views/search-meals.component';
import { RouterModule } from '@angular/router';
import { AllMealsComponent } from './search-meals/all-meals/views/all-meals.component';
import { CustomMealsComponent } from './search-meals/custom-meals/views/custom-meals.component';
import { FavoriteMealsComponent } from './search-meals/favorite-meals/views/favorite-meals.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MealDetailsComponent } from './meal-details/meal-details.component';

@NgModule({
  declarations: [
    AddMealComponent,
    SearchMealsComponent,
    AllMealsComponent,
    CustomMealsComponent,
    FavoriteMealsComponent,
    MealDetailsComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  exports: [AddMealComponent],
})
export class AddMealModule {}
