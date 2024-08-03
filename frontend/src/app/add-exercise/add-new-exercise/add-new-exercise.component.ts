import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExercisesService } from '../services/exercises.service';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';

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
    private exercisesService: ExercisesService
  ) {}

  closeAddNewExercise() {
    this.dialogRef.close();
  }

  saveExercise() {
    this.exercisesService
      .addExercise(this.muscleGroup, this.exercise)
      .subscribe((success: boolean) => {
        if (success) {
          this.dialogRef.close();
        }
      });
  }
}
