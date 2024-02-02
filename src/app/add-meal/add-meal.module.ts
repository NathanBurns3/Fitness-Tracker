import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMealComponent } from './views/add-meal.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AddMealComponent],
  imports: [CommonModule, RouterModule],
  exports: [AddMealComponent],
})
export class AddMealModule {}
