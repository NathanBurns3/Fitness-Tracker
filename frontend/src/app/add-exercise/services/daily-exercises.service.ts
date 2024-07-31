import { EventEmitter, Injectable } from '@angular/core';
import { IExercise } from '../models/exercise';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class DailyExercisesService {
  exerciseAdded = new EventEmitter<void>();

  exercises: IExercise[] = [
    {
      exerciseID: '1',
      muscleGroup: 'Chest',
      exerciseName: 'Bench Press',
      sets: 0,
    },
    {
      exerciseID: '2',
      muscleGroup: 'Chest',
      exerciseName: 'Incline Bench Press',
      sets: 0,
    },
    {
      exerciseID: '3',
      muscleGroup: 'Chest',
      exerciseName: 'Decline Bench Press',
      sets: 0,
    },
    {
      exerciseID: '4',
      muscleGroup: 'Chest',
      exerciseName: 'Chest Fly',
      sets: 0,
    },
    {
      exerciseID: '5',
      muscleGroup: 'Chest',
      exerciseName: 'Cable Crossover',
      sets: 0,
    },
    {
      exerciseID: '6',
      muscleGroup: 'Back',
      exerciseName: 'Deadlift',
      sets: 0,
    },
    {
      exerciseID: '7',
      muscleGroup: 'Back',
      exerciseName: 'Bent Over Row',
      sets: 0,
    },
    {
      exerciseID: '8',
      muscleGroup: 'Back',
      exerciseName: 'Pull Up',
      sets: 0,
    },
    {
      exerciseID: '9',
      muscleGroup: 'Back',
      exerciseName: 'Lat Pulldown',
      sets: 0,
    },
    {
      exerciseID: '10',
      muscleGroup: 'Back',
      exerciseName: 'Seated Row',
      sets: 0,
    },
    {
      exerciseID: '11',
      muscleGroup: 'Back',
      exerciseName: 'T-Bar Row',
      sets: 0,
    },
    {
      exerciseID: '12',
      muscleGroup: 'Back',
      exerciseName: 'Straight Arm Pulldown',
      sets: 0,
    },
  ];

  constructor(private snackBar: MatSnackBar) {}

  getExercises(): IExercise[] {
    return this.exercises;
  }

  addExercise(exercise: IExercise): boolean {
    if (this.getExercises().length >= 30) {
      this.snackBar.open('Maxed out the amount of exercises for the day!', '', {
        duration: 2000,
      });
      return false;
    }
    this.exercises.push(exercise);
    this.exerciseAdded.emit();
    this.snackBar.open(exercise.exerciseName + ' was added!', '', {
      duration: 2000,
    });
    return true;
  }

  updateExercise(exercise: IExercise): void {
    const index = this.exercises.findIndex(
      (w) => w.exerciseID === exercise.exerciseID
    );
    this.exercises[index] = exercise;
    this.snackBar.open(exercise.exerciseName + ' was edited!', '', {
      duration: 2000,
    });
  }

  deleteExercise(exercise: IExercise): void {
    const index = this.exercises.findIndex(
      (w) => w.exerciseID === exercise.exerciseID
    );
    this.exercises.splice(index, 1);
    this.snackBar.open(exercise.exerciseName + ' was deleted!', '', {
      duration: 2000,
    });
  }
}
