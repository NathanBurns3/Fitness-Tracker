import { Component, OnInit } from '@angular/core';
import { IWorkout } from '../models/workouts';
import { WorkoutsService } from '../services/workouts.service';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutDetailsComponent } from '../workout-details/workout-details.component';
import { DailyExercisesService } from '../services/daily-exercises.service';

@Component({
  selector: 'workout-list',
  templateUrl: './workout-list.component.html',
})
export class WorkoutListComponent implements OnInit {
  workouts: IWorkout[] = [];

  constructor(
    private dailyExerciseService: DailyExercisesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.workouts = this.dailyExerciseService.getExercises();
    this.dailyExerciseService.exerciseAdded.subscribe(() => {
      this.workouts = this.dailyExerciseService.getExercises();
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
