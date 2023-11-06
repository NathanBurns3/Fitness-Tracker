import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExerciseComponent } from './views/add-exercise.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AddExerciseComponent],
  imports: [CommonModule, RouterModule],
  exports: [AddExerciseComponent],
})
export class AddExerciseModule {}
