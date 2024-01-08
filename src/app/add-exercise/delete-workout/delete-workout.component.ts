/*
TODO:
button should be disabled if not valid
clean up the code
give confirmation message on delete
*/

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WorkoutsService } from '../services/workouts.service';
import { IWorkout } from '../models/workouts';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';

@Component({
  selector: 'delete-workout',
  templateUrl: './delete-workout.component.html',
})
export class DeleteWorkoutComponent {
  muscleGroup!: muscleGroupsEnum | string;
  workout: string = '';
  workouts: string[] = [];
  muscleGroups: muscleGroupsEnum[] = Object.values(muscleGroupsEnum);

  constructor(
    public dialogRef: MatDialogRef<DeleteWorkoutComponent>,
    private workoutsService: WorkoutsService
  ) {}

  closeDeleteWorkout() {
    this.dialogRef.close();
  }

  onMuscleGroupChange(selectedMuscleGroup: muscleGroupsEnum | string) {
    this.muscleGroup = selectedMuscleGroup;
    if (this.muscleGroup !== 'Choose a Muscle Group') {
      this.workouts = this.workoutsService.getWorkoutsById(
        muscleGroupsEnum[this.muscleGroup as muscleGroupsEnum]
      );
    }
    this.workout = 'Choose a Workout';
  }

  deleteWorkout() {
    this.workoutsService.deleteWorkout(
      this.muscleGroup as muscleGroupsEnum,
      this.workout
    );
    this.dialogRef.close();
  }
}
