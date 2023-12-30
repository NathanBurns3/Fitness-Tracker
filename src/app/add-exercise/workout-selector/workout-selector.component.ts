import { Component, EventEmitter, Output } from '@angular/core';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';
import { IWorkout } from '../models/workouts';
import { WorkoutsService } from '../services/workouts.service';

@Component({
  selector: 'workout-selector',
  templateUrl: './workout-selector.component.html',
})
export class WorkoutSelectorComponent {
  @Output() muscleGroupChange = new EventEmitter<string>();

  muscleGroups = Object.values(muscleGroupsEnum);
  selectedMuscleGroup = 'Choose a Muscle Group';
  selectedWorkout = 'Choose a Workout';
  workouts: IWorkout[] = [];
  sets: string = '';

  constructor(private workoutsService: WorkoutsService) {}

  onMuscleGroupChange() {
    this.workouts = this.workoutsService.getWorkoutsById(
      this.selectedMuscleGroup
    );
    this.selectedWorkout = 'Choose a Workout';
    this.muscleGroupChange.emit(this.selectedMuscleGroup);
  }

  onAddWorkout(exerciseName: string, sets: string): void {
    const newWorkout: IWorkout = {
      WorkoutId: this.workoutsService.workouts.length + 1,
      muscleGroup: this.selectedMuscleGroup,
      exerciseName: exerciseName,
      sets: Number(sets),
    };
    console.log('New Workout: ', newWorkout);
    this.workoutsService.addWorkout(newWorkout);
  }
}
