import { EventEmitter, Injectable } from '@angular/core';
import { IExercise } from '../models/exercise';

@Injectable({
  providedIn: 'root',
})
export class DailyExercisesService {
  exerciseAdded = new EventEmitter<void>();

  exercises: IExercise[] = [
    {
      exerciseId: 1,
      muscleGroup: 'Chest',
      exerciseName: 'Bench Press',
      sets: 0,
    },
    {
      exerciseId: 2,
      muscleGroup: 'Chest',
      exerciseName: 'Incline Bench Press',
      sets: 0,
    },
    {
      exerciseId: 3,
      muscleGroup: 'Chest',
      exerciseName: 'Decline Bench Press',
      sets: 0,
    },
    {
      exerciseId: 4,
      muscleGroup: 'Chest',
      exerciseName: 'Chest Fly',
      sets: 0,
    },
    {
      exerciseId: 5,
      muscleGroup: 'Chest',
      exerciseName: 'Cable Crossover',
      sets: 0,
    },
    {
      exerciseId: 6,
      muscleGroup: 'Back',
      exerciseName: 'Deadlift',
      sets: 0,
    },
    {
      exerciseId: 7,
      muscleGroup: 'Back',
      exerciseName: 'Bent Over Row',
      sets: 0,
    },
    {
      exerciseId: 8,
      muscleGroup: 'Back',
      exerciseName: 'Pull Up',
      sets: 0,
    },
    {
      exerciseId: 9,
      muscleGroup: 'Back',
      exerciseName: 'Lat Pulldown',
      sets: 0,
    },
    {
      exerciseId: 10,
      muscleGroup: 'Back',
      exerciseName: 'Seated Row',
      sets: 0,
    },
    {
      exerciseId: 11,
      muscleGroup: 'Back',
      exerciseName: 'T-Bar Row',
      sets: 0,
    },
    {
      exerciseId: 12,
      muscleGroup: 'Back',
      exerciseName: 'Straight Arm Pulldown',
      sets: 0,
    },
    {
      exerciseId: 13,
      muscleGroup: 'Back',
      exerciseName: 'Back Extension',
      sets: 0,
    },
    {
      exerciseId: 14,
      muscleGroup: 'Back',
      exerciseName: 'Reverse Fly',
      sets: 0,
    },
    {
      exerciseId: 15,
      muscleGroup: 'Back',
      exerciseName: 'Shrug',
      sets: 0,
    },
    {
      exerciseId: 16,
      muscleGroup: 'Back',
      exerciseName: 'Pull Over',
      sets: 0,
    },
    {
      exerciseId: 17,
      muscleGroup: 'Back',
      exerciseName: 'Pullover',
      sets: 0,
    },
    {
      exerciseId: 18,
      muscleGroup: 'Back',
      exerciseName: 'Pulldown',
      sets: 0,
    },
    {
      exerciseId: 22,
      muscleGroup: 'Biceps',
      exerciseName: 'Barbell Curl',
      sets: 0,
    },
    {
      exerciseId: 23,
      muscleGroup: 'Biceps',
      exerciseName: 'Dumbbell Curl',
      sets: 0,
    },
    {
      exerciseId: 24,
      muscleGroup: 'Biceps',
      exerciseName: 'Hammer Curl',
      sets: 0,
    },
    {
      exerciseId: 25,
      muscleGroup: 'Biceps',
      exerciseName: 'Preacher Curl',
      sets: 0,
    },
    {
      exerciseId: 26,
      muscleGroup: 'Biceps',
      exerciseName: 'Concentration Curl',
      sets: 0,
    },
    {
      exerciseId: 27,
      muscleGroup: 'Biceps',
      exerciseName: 'Reverse Curl',
      sets: 0,
    },
    {
      exerciseId: 28,
      muscleGroup: 'Biceps',
      exerciseName: 'Cable Curl',
      sets: 0,
    },
    {
      exerciseId: 29,
      muscleGroup: 'Biceps',
      exerciseName: 'EZ Bar Curl',
      sets: 0,
    },
    {
      exerciseId: 30,
      muscleGroup: 'Biceps',
      exerciseName: 'Concentration Curl',
      sets: 0,
    },
    {
      exerciseId: 31,
      muscleGroup: 'Biceps',
      exerciseName: 'Cable Curl',
      sets: 0,
    },
    {
      exerciseId: 32,
      muscleGroup: 'Biceps',
      exerciseName: 'EZ Bar Curl',
      sets: 0,
    },
    {
      exerciseId: 33,
      muscleGroup: 'Biceps',
      exerciseName: 'Concentration Curl',
      sets: 0,
    },
    {
      exerciseId: 34,
      muscleGroup: 'Biceps',
      exerciseName: 'Cable Curl',
      sets: 0,
    },
    {
      exerciseId: 35,
      muscleGroup: 'Biceps',
      exerciseName: 'EZ Bar Curl',
      sets: 0,
    },
    {
      exerciseId: 36,
      muscleGroup: 'Biceps',
      exerciseName: 'Concentration Curl',
      sets: 0,
    },
    {
      exerciseId: 37,
      muscleGroup: 'Biceps',
      exerciseName: 'Cable Curl',
      sets: 0,
    },
  ];

  getExercises(): IExercise[] {
    return this.exercises;
  }

  addExercise(exercise: IExercise): void {
    this.exercises.push(exercise);
    this.exerciseAdded.emit();
  }

  updateExercise(exercise: IExercise): void {
    const index = this.exercises.findIndex(
      (w) => w.exerciseId === exercise.exerciseId
    );
    this.exercises[index] = exercise;
  }

  deleteExercise(exercise: IExercise): void {
    const index = this.exercises.findIndex(
      (w) => w.exerciseId === exercise.exerciseId
    );
    this.exercises.splice(index, 1);
  }
}
