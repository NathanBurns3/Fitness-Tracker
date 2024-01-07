import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExerciseComponent } from './views/add-exercise.component';
import { RouterModule } from '@angular/router';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutSelectorComponent } from './workout-selector/workout-selector.component';
import { FormsModule } from '@angular/forms';
import { WorkoutImageComponent } from './workout-image/workout-image.component';
import { WorkoutDetailsComponent } from './workout-details/workout-details.component';
import { AddNewWorkoutComponent } from './add-new-workout/add-new-workout.component';

@NgModule({
  declarations: [
    AddExerciseComponent,
    WorkoutListComponent,
    WorkoutSelectorComponent,
    WorkoutImageComponent,
    WorkoutDetailsComponent,
    AddNewWorkoutComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [AddExerciseComponent],
})
export class AddExerciseModule {}
