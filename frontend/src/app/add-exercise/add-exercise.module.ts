import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExerciseComponent } from './views/add-exercise.component';
import { RouterModule } from '@angular/router';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseSelectorComponent } from './exercise-selector/exercise-selector.component';
import { FormsModule } from '@angular/forms';
import { ExerciseImageComponent } from './exercise-image/exercise-image.component';
import { ExerciseDetailsComponent } from './exercise-details/exercise-details.component';
import { AddNewExerciseComponent } from './add-new-exercise/add-new-exercise.component';
import { DeleteExerciseComponent } from './delete-exercise/delete-exercise.component';

@NgModule({
  declarations: [
    ExerciseListComponent,
    ExerciseListComponent,
    ExerciseSelectorComponent,
    ExerciseImageComponent,
    ExerciseDetailsComponent,
    AddNewExerciseComponent,
    DeleteExerciseComponent,
    AddExerciseComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [AddExerciseComponent],
})
export class AddExerciseModule {}
