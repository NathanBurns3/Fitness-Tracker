import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMealComponent } from './views/add-meal.component';
import { SearchMealsComponent } from './search-meals/views/search-meals.component';
import { RouterModule } from '@angular/router';
import { AllMealsComponent } from './search-meals/all-meals/views/all-meals.component';
import { CustomMealsComponent } from './search-meals/custom-meals/views/custom-meals.component';

@NgModule({
  declarations: [
    AddMealComponent,
    SearchMealsComponent,
    AllMealsComponent,
    CustomMealsComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [AddMealComponent],
})
export class AddMealModule {}
