/*
TODO:
validation on save
  sets is a number and greater than 0 and under a certain number (100?)
    should disable save button if not valid
clean up the code
give confirmation message on save/delete
*/

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IWorkout } from '../models/workouts';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';
import { WorkoutsService } from '../services/workouts.service';
import { DailyExercisesService } from '../services/daily-exercises.service';

@Component({
  selector: 'workout-details',
  templateUrl: './workout-details.component.html',
})
export class WorkoutDetailsComponent implements OnInit {
  muscleGroup!: muscleGroupsEnum | string;
  workout: string;
  sets: number;
  workouts: string[] = [];
  muscleGroups: muscleGroupsEnum[] = Object.values(muscleGroupsEnum);

  constructor(
    private workoutsService: WorkoutsService,
    private dailyExercisesService: DailyExercisesService,
    public dialogRef: MatDialogRef<WorkoutDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { workout: IWorkout }
  ) {
    this.muscleGroup = this.data.workout.muscleGroup as muscleGroupsEnum;
    this.workout = this.data.workout.exerciseName;
    this.sets = this.data.workout.sets;
  }

  ngOnInit(): void {
    this.workouts = this.workoutsService.getWorkoutsById(
      this.muscleGroup as muscleGroupsEnum
    );
  }

  onMuscleGroupChange(selectedMuscleGroup: muscleGroupsEnum | string) {
    this.muscleGroup = selectedMuscleGroup;
    this.workouts = this.workoutsService.getWorkoutsById(
      this.muscleGroup as muscleGroupsEnum
    );
    this.workout = 'Choose a Workout';
  }

  closeEditWorkout() {
    this.dialogRef.close();
  }

  saveWorkout() {
    this.data.workout.muscleGroup = this.muscleGroup;
    this.data.workout.exerciseName = this.workout;
    this.data.workout.sets = this.sets;
    this.dailyExercisesService.updateExercise(this.data.workout);
    this.dialogRef.close();
  }

  deleteWorkout() {
    this.dailyExercisesService.deleteExercise(this.data.workout);
    this.dialogRef.close();
  }
}
