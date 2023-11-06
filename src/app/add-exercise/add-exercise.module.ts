import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExerciseComponent } from './views/add-exercise.component';

@NgModule({
  declarations: [AddExerciseComponent],
  imports: [CommonModule],
  exports: [AddExerciseComponent],
})
export class AddExerciseModule {}
