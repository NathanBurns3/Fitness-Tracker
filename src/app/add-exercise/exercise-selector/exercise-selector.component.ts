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
import { IExercise } from '../models/exercise';
import { ExercisesService } from '../services/exercises.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewExerciseComponent } from '../add-new-exercise/add-new-exercise.component';
import { DeleteExerciseComponent } from '../delete-exercise/delete-exercise.component';
import { DailyExercisesService } from '../services/daily-exercises.service';

@Component({
  selector: 'exercise-selector',
  templateUrl: './exercise-selector.component.html',
})
export class ExerciseSelectorComponent {
  @Output() muscleGroupChange = new EventEmitter<string>();

  muscleGroups = Object.values(muscleGroupsEnum);
  selectedMuscleGroup = 'Choose a Muscle Group';
  selectedExercise = 'Choose a Exercise';
  exercises: string[] = [];
  sets: string = '';

  constructor(
    private exercisesService: ExercisesService,
    private dailyExercisesService: DailyExercisesService,
    private dialog: MatDialog
  ) {}

  onMuscleGroupChange() {
    this.exercises = this.exercisesService.getExercisesById(
      this.selectedMuscleGroup as muscleGroupsEnum
    );
    this.selectedExercise = 'Choose a Exercise';
    this.muscleGroupChange.emit(this.selectedMuscleGroup);
  }

  onAddExercise(exerciseName: string, sets: string): void {
    const newExercise: IExercise = {
      exerciseId: this.dailyExercisesService.exercises.length + 1,
      muscleGroup: this.selectedMuscleGroup,
      exerciseName: exerciseName,
      sets: Number(sets),
    };
    this.dailyExercisesService.addExercise(newExercise);
    this.selectedMuscleGroup = 'Choose a Muscle Group';
    this.selectedExercise = 'Choose a Exercise';
    this.sets = '';
  }

  openAddNewExerciseDialog() {
    this.dialog.open(AddNewExerciseComponent, {
      width: '500px',
      height: '500px',
    });
  }

  openDeleteExerciseDialog() {
    this.dialog.open(DeleteExerciseComponent, {
      width: '500px',
      height: '500px',
    });
  }
}
