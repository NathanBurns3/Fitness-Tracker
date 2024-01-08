import { EventEmitter, Injectable } from '@angular/core';
import { IWorkout } from '../models/workouts';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService {
  workoutAdded = new EventEmitter<void>();

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

  getWorkoutsById(selectedMuscleGroup: muscleGroupsEnum): string[] {
    return this.exercises[selectedMuscleGroup];
  }

  addWorkout(muscleGroup: muscleGroupsEnum, workout: string) {
    this.exercises[muscleGroup].push(workout);
  }

  deleteWorkout(muscleGroup: muscleGroupsEnum, workout: string) {
    const index = this.exercises[muscleGroup].indexOf(workout);
    this.exercises[muscleGroup].splice(index, 1);
  }
}
