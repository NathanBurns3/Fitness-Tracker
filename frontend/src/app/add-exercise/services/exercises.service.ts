import { EventEmitter, Injectable } from '@angular/core';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  exerciseAdded = new EventEmitter<void>();

  exercises: Record<muscleGroupsEnum, string[]> = {
    Abs: ['Crunches', 'Leg Raises', 'Plank'],
    Back: [
      'Deadlift',
      'Bent Over Row',
      'Pull Up',
      'Lat Pulldown',
      'Seated Row',
      'T-Bar Row',
      'Straight Arm Pulldown',
      'Back Extension',
      'Reverse Fly',
      'Shrug',
      'Pull Over',
      'Pullover',
      'Pulldown',
    ],
    Biceps: [
      'Barbell Curl',
      'Dumbbell Curl',
      'Hammer Curl',
      'Preacher Curl',
      'Concentration Curl',
      'Reverse Curl',
      'Cable Curl',
      'EZ Bar Curl',
    ],
    Calves: [
      'Standing Calf Raise',
      'Seated Calf Raise',
      'Donkey Calf Raise',
      'Calf Press',
    ],
    Chest: [
      'Bench Press',
      'Incline Bench Press',
      'Decline Bench Press',
      'Chest Fly',
      'Cable Crossover',
    ],
    Forearms: ['Wrist Curl', 'Reverse Wrist Curl', 'Wrist Roller'],
    Glutes: [
      'Squat',
      'Lunge',
      'Leg Press',
      'Deadlift',
      'Hip Thrust',
      'Bulgarian Split Squat',
      'Step Up',
      'Good Morning',
      'Leg Extension',
      'Leg Curl',
    ],
    Hamstrings: [
      'Squat',
      'Lunge',
      'Leg Press',
      'Deadlift',
      'Hip Thrust',
      'Bulgarian Split Squat',
      'Step Up',
      'Good Morning',
      'Leg Extension',
      'Leg Curl',
    ],
    Quads: [
      'Squat',
      'Lunge',
      'Leg Press',
      'Deadlift',
      'Hip Thrust',
      'Bulgarian Split Squat',
      'Step Up',
      'Good Morning',
      'Leg Extension',
      'Leg Curl',
    ],
    Shoulders: [
      'Overhead Press',
      'Lateral Raise',
      'Front Raise',
      'Rear Delt Fly',
      'Shrug',
      'Upright Row',
      'Face Pull',
      'Arnold Press',
      'Lateral Raise',
      'Front Raise',
      'Rear Delt Fly',
      'Shrug',
      'Upright Row',
      'Face Pull',
      'Arnold Press',
    ],
    Triceps: [
      'Close Grip Bench Press',
      'Skullcrusher',
      'Dip',
      'Kickback',
      'Pushdown',
      'Close Grip Bench Press',
      'Skullcrusher',
      'Dip',
      'Kickback',
      'Pushdown',
    ],
  };

  constructor(private snackBar: MatSnackBar) {}

  getExercisesById(selectedMuscleGroup: muscleGroupsEnum): string[] {
    return this.exercises[selectedMuscleGroup];
  }

  addExercise(muscleGroup: muscleGroupsEnum, exercise: string): boolean {
    if (this.countExercises(muscleGroup) >= 50) {
      this.snackBar.open(
        'Maxed out the amount of exercises for this muscle group!',
        '',
        {
          duration: 2000,
        }
      );
      return false;
    }

    if (this.exerciseExists(muscleGroup, exercise)) {
      this.snackBar.open(exercise + ' already exists!', '', {
        duration: 2000,
      });
      return false;
    }

    this.exercises[muscleGroup].push(exercise);
    this.snackBar.open(exercise + ' was added!', '', {
      duration: 2000,
    });
    return true;
  }

  deleteExercise(muscleGroup: muscleGroupsEnum, exercise: string) {
    const index = this.exercises[muscleGroup].indexOf(exercise);
    this.exercises[muscleGroup].splice(index, 1);
    this.snackBar.open(exercise + ' was deleted!', '', {
      duration: 2000,
    });
  }

  exerciseExists(muscleGroup: muscleGroupsEnum, exercise: string): boolean {
    return this.exercises[muscleGroup]
      .map((e) => e.toLowerCase())
      .includes(exercise.toLowerCase());
  }

  countExercises(muscleGroup: muscleGroupsEnum): number {
    return this.exercises[muscleGroup].length;
  }
}
