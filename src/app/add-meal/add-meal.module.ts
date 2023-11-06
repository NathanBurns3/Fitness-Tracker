import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMealComponent } from './views/add-meal.component';

@NgModule({
  declarations: [AddMealComponent],
  imports: [CommonModule],
  exports: [AddMealComponent],
})
export class AddMealModule {}
