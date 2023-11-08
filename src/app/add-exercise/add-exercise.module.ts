import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExerciseComponent } from './views/add-exercise.component';
import { RouterModule } from '@angular/router';
import { WorkoutListModule } from './workout-list/workout-list.module';

@NgModule({
  declarations: [AddExerciseComponent],
  imports: [CommonModule, RouterModule, WorkoutListModule],
  exports: [AddExerciseComponent],
})
export class AddExerciseModule {}
