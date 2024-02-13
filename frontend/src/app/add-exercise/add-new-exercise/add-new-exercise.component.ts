/*
TODO:
validation on save
  make sure it doesn't already exist
    should disable add button if not valid
clean up the code
give confirmation message on add
*/

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExercisesService } from '../services/exercises.service';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';

@Component({
  selector: 'add-new-exercise',
  templateUrl: './add-new-exercise.component.html',
})
export class AddNewExerciseComponent {
  muscleGroup!: muscleGroupsEnum;
  muscleGroups: muscleGroupsEnum[] = Object.values(muscleGroupsEnum);
  exercise: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddNewExerciseComponent>,
    private exercisesService: ExercisesService
  ) {}

  closeAddNewExercise() {
    this.dialogRef.close();
  }

  saveExercise() {
    this.exercisesService.addExercise(this.muscleGroup, this.exercise);
    this.dialogRef.close();
  }
}
