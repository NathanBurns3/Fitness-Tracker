import { Component, OnInit } from '@angular/core';
import { IExercise } from '../models/exercise';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseDetailsComponent } from '../exercise-details/exercise-details.component';
import { DailyExercisesService } from '../services/daily-exercises.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css',
  standalone: false,
})
export class ExerciseListComponent implements OnInit {
  exercises: IExercise[] = [];
  isLoading = false;

  constructor(
    private dailyExerciseService: DailyExercisesService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadList();
  }

  loadList(): void {
    this.isLoading = true;
    this.dailyExerciseService
      .getExercises()
      .subscribe((exercises: IExercise[]) => {
        this.exercises = exercises;
        this.isLoading = false;
      });
    this.dailyExerciseService.exerciseAdded
      .pipe(switchMap(() => this.dailyExerciseService.getExercises()))
      .subscribe((exercises: IExercise[]) => {
        this.exercises = exercises;
        this.isLoading = false;
      });
  }

  openExerciseDetails(exercise: IExercise): void {
    const dialogRef = this.dialog.open(ExerciseDetailsComponent, {
      data: { exercise },
      width: '500px',
      height: '500px',
    });

    dialogRef.componentInstance.exerciseDeleted.subscribe(() => {
      this.loadList();
    });
  }
}
