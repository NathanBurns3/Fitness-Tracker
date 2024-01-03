import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IWorkout } from '../models/workouts';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';
import { WorkoutsService } from '../services/workouts.service';

@Component({
  selector: 'workout-details',
  templateUrl: './workout-details.component.html',
})
export class WorkoutDetailsComponent implements OnInit {
  muscleGroup: string;
  workout: string;
  sets: number;
  workouts: IWorkout[] = [];
  muscleGroups: muscleGroupsEnum[] = Object.values(muscleGroupsEnum);

  constructor(
    private workoutsService: WorkoutsService,
    public dialogRef: MatDialogRef<WorkoutDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { workout: IWorkout }
  ) {
    this.muscleGroup = this.data.workout.muscleGroup;
    this.workout = this.data.workout.exerciseName;
    this.sets = this.data.workout.sets;
  }

  ngOnInit() {
    this.workouts = this.workoutsService.getWorkoutsById(this.muscleGroup);
  }

  onMuscleGroupChange(selectedMuscleGroup: string) {
    this.muscleGroup = selectedMuscleGroup;
    this.workouts = this.workoutsService.getWorkoutsById(this.muscleGroup);
    this.workout = 'Choose a Workout';
  }

  closeEditWorkout() {
    this.dialogRef.close();
  }

  saveWorkout() {
    this.data.workout.muscleGroup = this.muscleGroup;
    this.data.workout.exerciseName = this.workout;
    this.data.workout.sets = this.sets;
    this.workoutsService.updateWorkout(this.data.workout);
    this.dialogRef.close();
  }

  deleteWorkout() {
    this.workoutsService.deleteWorkout(this.data.workout);
    this.dialogRef.close();
  }
}
