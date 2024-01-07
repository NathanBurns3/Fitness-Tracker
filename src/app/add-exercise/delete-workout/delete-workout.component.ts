import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WorkoutsService } from '../services/workouts.service';
import { IWorkout } from '../models/workouts';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';

@Component({
  selector: 'delete-workout',
  templateUrl: './delete-workout.component.html',
})
export class DeleteWorkoutComponent implements OnInit {
  muscleGroup: string = '';
  workout: string = '';
  workouts: IWorkout[] = [];
  muscleGroups: muscleGroupsEnum[] = Object.values(muscleGroupsEnum);

  constructor(
    public dialogRef: MatDialogRef<DeleteWorkoutComponent>,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit(): void {}

  closeDeleteWorkout() {
    this.dialogRef.close();
  }

  onMuscleGroupChange(selectedMuscleGroup: string) {
    this.muscleGroup = selectedMuscleGroup;
    this.workouts = this.workoutsService.getWorkoutsById(this.muscleGroup);
    this.workout = 'Choose a Workout';
  }

  deleteWorkout() {
    const deletedWorkout: IWorkout | undefined = this.workouts.find(
      (w) => w.exerciseName === this.workout
    );
    if (deletedWorkout) {
      this.workoutsService.deleteWorkout(deletedWorkout);
    }
    this.dialogRef.close();
  }
}
