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
import { IWorkout } from '../models/workouts';
import { WorkoutsService } from '../services/workouts.service';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';

@Component({
  selector: 'add-new-workout',
  templateUrl: './add-new-workout.component.html',
})
export class AddNewWorkoutComponent {
  muscleGroup!: muscleGroupsEnum;
  muscleGroups: muscleGroupsEnum[] = Object.values(muscleGroupsEnum);
  workout: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddNewWorkoutComponent>,
    private workoutsService: WorkoutsService
  ) {}

  closeAddNewWorkout() {
    this.dialogRef.close();
  }

  saveWorkout() {
    this.workoutsService.addWorkout(this.muscleGroup, this.workout);
    this.dialogRef.close();
  }
}
