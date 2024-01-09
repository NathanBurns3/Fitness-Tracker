import { EventEmitter, Injectable } from '@angular/core';
import { IExercise } from '../models/exercise';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';

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

  getExercisesById(selectedMuscleGroup: muscleGroupsEnum): string[] {
    return this.exercises[selectedMuscleGroup];
  }

  addExercise(muscleGroup: muscleGroupsEnum, exercise: string) {
    this.exercises[muscleGroup].push(exercise);
  }

  deleteExercise(muscleGroup: muscleGroupsEnum, exercise: string) {
    const index = this.exercises[muscleGroup].indexOf(exercise);
    this.exercises[muscleGroup].splice(index, 1);
  }
}
