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
  workouts: IWorkout[] = [];
  muscleGroup: string = '';
  muscleGroups: muscleGroupsEnum[] = Object.values(muscleGroupsEnum);
  workout: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddNewWorkoutComponent>,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit(): void {
    this.workouts = this.workoutsService.getWorkouts();
    console.log('Workouts: ', this.workouts);
  }

  closeAddNewWorkout() {
    this.dialogRef.close();
  }

  saveWorkout() {
    const newWorkout = {
      WorkoutId: 0,
      muscleGroup: this.muscleGroup,
      exerciseName: this.workout,
      sets: 0,
    };
    this.workoutsService.addWorkout(newWorkout);
  }
}
