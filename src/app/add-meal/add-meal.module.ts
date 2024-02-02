import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMealComponent } from './views/add-meal.component';
import { SearchMealsComponent } from './search-meals/views/search-meals.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AddMealComponent, SearchMealsComponent],
  imports: [CommonModule, RouterModule],
  exports: [AddMealComponent],
})
export class AddMealModule {}
