import { Component, OnInit } from '@angular/core';
import { IExercise } from '../models/exercise';
import { ExercisesService } from '../services/exercises.service';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseDetailsComponent } from '../exercise-details/exercise-details.component';
import { DailyExercisesService } from '../services/daily-exercises.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
})
export class ExerciseListComponent implements OnInit {
  exercises: IExercise[] = [];

  constructor(
    private dailyExerciseService: DailyExercisesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dailyExerciseService
      .getExercises()
      .subscribe((exercises: IExercise[]) => {
        this.exercises = exercises;
      });
    this.dailyExerciseService.exerciseAdded
      .pipe(switchMap(() => this.dailyExerciseService.getExercises()))
      .subscribe((exercises: IExercise[]) => {
        this.exercises = exercises;
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
