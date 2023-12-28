import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExerciseComponent } from './views/add-exercise.component';
import { RouterModule } from '@angular/router';
import { WorkoutListComponent } from './workout-list/views/workout-list.component';
import { WorkoutSelectorComponent } from './workout-selector/views/workout-selector.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddExerciseComponent,
    WorkoutListComponent,
    WorkoutSelectorComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [AddExerciseComponent],
})
export class AddExerciseModule {}
