import { Component, OnInit } from '@angular/core';
import { IWorkout } from '../models/workouts';
import { WorkoutsService } from '../services/workouts.service';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutDetailsComponent } from '../workout-details/workout-details.component';

@Component({
  selector: 'workout-list',
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent implements OnInit {
  workouts: IWorkout[] = [];

  constructor(
    private workoutService: WorkoutsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.workouts = this.workoutService.getWorkouts();
    this.workoutService.workoutAdded.subscribe(() => {
      this.workouts = this.workoutService.getWorkouts();
    });
  }

  openWorkoutDetails(workout: IWorkout): void {
    this.dialog.open(WorkoutDetailsComponent, {
      data: { workout },
      width: '500px',
      height: '500px',
    });
  }
}
