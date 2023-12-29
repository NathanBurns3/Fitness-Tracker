import { EventEmitter, Injectable } from '@angular/core';
import { IWorkout } from '../models/workouts';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  workoutAdded = new EventEmitter<void>();

  workouts: IWorkout[] = [
    {
      WorkoutId: 1,
      muscleGroup: 'Chest',
      exerciseName: 'Bench Press',
      sets: 0,
    },
    {
      WorkoutId: 2,
      muscleGroup: 'Chest',
      exerciseName: 'Incline Bench Press',
      sets: 0,
    },
    {
      WorkoutId: 3,
      muscleGroup: 'Chest',
      exerciseName: 'Decline Bench Press',
      sets: 0,
    },
    {
      WorkoutId: 4,
      muscleGroup: 'Chest',
      exerciseName: 'Chest Fly',
      sets: 0,
    },
    {
      WorkoutId: 5,
      muscleGroup: 'Chest',
      exerciseName: 'Cable Crossover',
      sets: 0,
    },
    {
      WorkoutId: 6,
      muscleGroup: 'Back',
      exerciseName: 'Deadlift',
      sets: 0,
    },
    {
      WorkoutId: 7,
      muscleGroup: 'Back',
      exerciseName: 'Bent Over Row',
      sets: 0,
    },
    {
      WorkoutId: 8,
      muscleGroup: 'Back',
      exerciseName: 'Pull Up',
      sets: 0,
    },
    {
      WorkoutId: 9,
      muscleGroup: 'Back',
      exerciseName: 'Lat Pulldown',
      sets: 0,
    },
    {
      WorkoutId: 10,
      muscleGroup: 'Back',
      exerciseName: 'Seated Row',
      sets: 0,
    },
    {
      WorkoutId: 11,
      muscleGroup: 'Back',
      exerciseName: 'T-Bar Row',
      sets: 0,
    },
    {
      WorkoutId: 12,
      muscleGroup: 'Back',
      exerciseName: 'Straight Arm Pulldown',
      sets: 0,
    },
    {
      WorkoutId: 13,
      muscleGroup: 'Back',
      exerciseName: 'Back Extension',
      sets: 0,
    },
    {
      WorkoutId: 14,
      muscleGroup: 'Back',
      exerciseName: 'Reverse Fly',
      sets: 0,
    },
    {
      WorkoutId: 15,
      muscleGroup: 'Back',
      exerciseName: 'Shrug',
      sets: 0,
    },
    {
      WorkoutId: 16,
      muscleGroup: 'Back',
      exerciseName: 'Pull Over',
      sets: 0,
    },
    {
      WorkoutId: 17,
      muscleGroup: 'Back',
      exerciseName: 'Pullover',
      sets: 0,
    },
    {
      WorkoutId: 18,
      muscleGroup: 'Back',
      exerciseName: 'Pulldown',
      sets: 0,
    },
    {
      WorkoutId: 22,
      muscleGroup: 'Biceps',
      exerciseName: 'Barbell Curl',
      sets: 0,
    },
    {
      WorkoutId: 23,
      muscleGroup: 'Biceps',
      exerciseName: 'Dumbbell Curl',
      sets: 0,
    },
    {
      WorkoutId: 24,
      muscleGroup: 'Biceps',
      exerciseName: 'Hammer Curl',
      sets: 0,
    },
    {
      WorkoutId: 25,
      muscleGroup: 'Biceps',
      exerciseName: 'Preacher Curl',
      sets: 0,
    },
    {
      WorkoutId: 26,
      muscleGroup: 'Biceps',
      exerciseName: 'Concentration Curl',
      sets: 0,
    },
    {
      WorkoutId: 27,
      muscleGroup: 'Biceps',
      exerciseName: 'Reverse Curl',
      sets: 0,
    },
    {
      WorkoutId: 28,
      muscleGroup: 'Biceps',
      exerciseName: 'Cable Curl',
      sets: 0,
    },
    {
      WorkoutId: 29,
      muscleGroup: 'Biceps',
      exerciseName: 'EZ Bar Curl',
      sets: 0,
    },
    {
      WorkoutId: 30,
      muscleGroup: 'Biceps',
      exerciseName: 'Concentration Curl',
      sets: 0,
    },
    {
      WorkoutId: 31,
      muscleGroup: 'Biceps',
      exerciseName: 'Cable Curl',
      sets: 0,
    },
    {
      WorkoutId: 32,
      muscleGroup: 'Biceps',
      exerciseName: 'EZ Bar Curl',
      sets: 0,
    },
    {
      WorkoutId: 33,
      muscleGroup: 'Biceps',
      exerciseName: 'Concentration Curl',
      sets: 0,
    },
    {
      WorkoutId: 34,
      muscleGroup: 'Biceps',
      exerciseName: 'Cable Curl',
      sets: 0,
    },
    {
      WorkoutId: 35,
      muscleGroup: 'Biceps',
      exerciseName: 'EZ Bar Curl',
      sets: 0,
    },
    {
      WorkoutId: 36,
      muscleGroup: 'Biceps',
      exerciseName: 'Concentration Curl',
      sets: 0,
    },
    {
      WorkoutId: 37,
      muscleGroup: 'Biceps',
      exerciseName: 'Cable Curl',
      sets: 0,
    },
  ];

  getWorkoutsById(selectedMuscleGroup: string): IWorkout[] {
    return this.workouts.filter(
      (workout) => workout.muscleGroup === selectedMuscleGroup
    );
  }

  getWorkouts(): IWorkout[] {
    return this.workouts;
  }

  addWorkout(workout: IWorkout) {
    this.workouts.push(workout);
    this.workoutAdded.emit();
  }
}
