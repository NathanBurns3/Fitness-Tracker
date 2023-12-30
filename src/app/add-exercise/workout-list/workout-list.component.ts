import { Component, OnInit } from '@angular/core';
import { IWorkout } from '../models/workouts';
import { WorkoutsService } from '../services/workouts.service';

@Component({
  selector: 'workout-list',
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent implements OnInit {
  workouts: IWorkout[] = [];

  constructor(private workoutService: WorkoutsService) {}

  ngOnInit(): void {
    this.workouts = this.workoutService.getWorkouts();
    this.workoutService.workoutAdded.subscribe(() => {
      this.workouts = this.workoutService.getWorkouts();
    });
  }
}
