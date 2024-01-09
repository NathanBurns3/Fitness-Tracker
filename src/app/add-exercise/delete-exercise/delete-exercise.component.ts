/*
TODO:
button should be disabled if not valid
clean up the code
give confirmation message on delete
*/

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExercisesService } from '../services/exercises.service';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';

@Component({
  selector: 'delete-exercise',
  templateUrl: './delete-exercise.component.html',
})
export class DeleteExerciseComponent {
  muscleGroup!: muscleGroupsEnum | string;
  exercise: string = '';
  exercises: string[] = [];
  muscleGroups: muscleGroupsEnum[] = Object.values(muscleGroupsEnum);

  constructor(
    public dialogRef: MatDialogRef<DeleteExerciseComponent>,
    private exercisesService: ExercisesService
  ) {}

  closeDeleteExercise() {
    this.dialogRef.close();
  }

  onMuscleGroupChange(selectedMuscleGroup: muscleGroupsEnum | string) {
    this.muscleGroup = selectedMuscleGroup;
    if (this.muscleGroup !== 'Choose a Muscle Group') {
      this.exercises = this.exercisesService.getExercisesById(
        muscleGroupsEnum[this.muscleGroup as muscleGroupsEnum]
      );
    }
    this.exercise = 'Choose a Exercise';
  }

  deleteExercise() {
    this.exercisesService.deleteExercise(
      this.muscleGroup as muscleGroupsEnum,
      this.exercise
    );
    this.dialogRef.close();
  }
}
