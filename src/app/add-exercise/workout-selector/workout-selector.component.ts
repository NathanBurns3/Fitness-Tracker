/*
TODO:
validation on save
  sets is a number and greater than 0 and under a certain number (100?)
    should disable add button if not valid
clean up the code
give confirmation message on add
*/

import { Component, EventEmitter, Output } from '@angular/core';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';
import { IWorkout } from '../models/workouts';
import { WorkoutsService } from '../services/workouts.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewWorkoutComponent } from '../add-new-workout/add-new-workout.component';
import { DeleteWorkoutComponent } from '../delete-workout/delete-workout.component';
import { DailyExercisesService } from '../services/daily-exercises.service';

@Component({
  selector: 'workout-selector',
  templateUrl: './workout-selector.component.html',
})
export class WorkoutSelectorComponent {
  @Output() muscleGroupChange = new EventEmitter<string>();

  muscleGroups = Object.values(muscleGroupsEnum);
  selectedMuscleGroup = 'Choose a Muscle Group';
  selectedWorkout = 'Choose a Workout';
  workouts: string[] = [];
  sets: string = '';

  constructor(
    private workoutsService: WorkoutsService,
    private dailyExercisesService: DailyExercisesService,
    private dialog: MatDialog
  ) {}

  onMuscleGroupChange() {
    this.workouts = this.workoutsService.getWorkoutsById(
      this.selectedMuscleGroup as muscleGroupsEnum
    );
    this.selectedWorkout = 'Choose a Workout';
    this.muscleGroupChange.emit(this.selectedMuscleGroup);
  }

  onAddWorkout(exerciseName: string, sets: string): void {
    const newWorkout: IWorkout = {
      WorkoutId: this.dailyExercisesService.exercises.length + 1,
      muscleGroup: this.selectedMuscleGroup,
      exerciseName: exerciseName,
      sets: Number(sets),
    };
    this.dailyExercisesService.addExercise(newWorkout);
    this.selectedMuscleGroup = 'Choose a Muscle Group';
    this.selectedWorkout = 'Choose a Workout';
    this.sets = '';
  }

  openAddNewWorkoutDialog() {
    this.dialog.open(AddNewWorkoutComponent, {
      width: '500px',
      height: '500px',
    });
  }

  openDeleteWorkoutDialog() {
    this.dialog.open(DeleteWorkoutComponent, {
      width: '500px',
      height: '500px',
    });
  }
}
