/*
TODO:
clean up the code
*/

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExercisesService } from '../services/exercises.service';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'add-new-exercise',
  templateUrl: './add-new-exercise.component.html',
  styleUrls: ['./add-new-exercise.component.css'],
})
export class AddNewExerciseComponent {
  muscleGroup!: muscleGroupsEnum;
  muscleGroups: muscleGroupsEnum[] = Object.values(muscleGroupsEnum);
  exercise: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddNewExerciseComponent>,
    private exercisesService: ExercisesService,
    private snackBar: MatSnackBar
  ) {}

  closeAddNewExercise() {
    this.dialogRef.close();
  }

  saveExercise() {
    if (
      !this.exercisesService.exerciseExists(this.muscleGroup, this.exercise)
    ) {
      this.exercisesService.addExercise(this.muscleGroup, this.exercise);
      this.dialogRef.close();
    } else {
      this.snackBar.open(this.exercise + ' already exists!', '', {
        duration: 2000,
      });
    }
  }
}
