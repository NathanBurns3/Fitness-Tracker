import { Component, OnInit } from '@angular/core';
import { IExercise } from '../models/exercise';
import { ExercisesService } from '../services/exercises.service';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseDetailsComponent } from '../exercise-details/exercise-details.component';
import { DailyExercisesService } from '../services/daily-exercises.service';

@Component({
  selector: 'exercise-list',
  templateUrl: './exercise-list.component.html',
})
export class ExerciseListComponent implements OnInit {
  exercises: IExercise[] = [];

  constructor(
    private dailyExerciseService: DailyExercisesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.exercises = this.dailyExerciseService.getExercises();
    this.dailyExerciseService.exerciseAdded.subscribe(() => {
      this.exercises = this.dailyExerciseService.getExercises();
    });
  }

  openExerciseDetails(exercise: IExercise): void {
    this.dialog.open(ExerciseDetailsComponent, {
      data: { exercise },
      width: '500px',
      height: '500px',
    });
  }
}
