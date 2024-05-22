/*
TODO:
clean up the code
*/

import { Component, EventEmitter, Output } from '@angular/core';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';
import { IExercise } from '../models/exercise';
import { ExercisesService } from '../services/exercises.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewExerciseComponent } from '../add-new-exercise/add-new-exercise.component';
import { DeleteExerciseComponent } from '../delete-exercise/delete-exercise.component';
import { DailyExercisesService } from '../services/daily-exercises.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'exercise-selector',
  templateUrl: './exercise-selector.component.html',
  styleUrls: ['./exercise-selector.component.css'],
})
export class ExerciseSelectorComponent {
  @Output() muscleGroupChange = new EventEmitter<string>();

  muscleGroups = Object.values(muscleGroupsEnum);
  selectedMuscleGroup = 'Choose a Muscle Group';
  selectedExercise = 'Choose a Exercise';
  exercises: string[] = [];
  sets: FormControl;

  constructor(
    private exercisesService: ExercisesService,
    private dailyExercisesService: DailyExercisesService,
    private dialog: MatDialog
  ) {
    this.sets = new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(999),
    ]);
  }

  onMuscleGroupChange() {
    this.exercises = this.exercisesService.getExercisesById(
      this.selectedMuscleGroup as muscleGroupsEnum
    );
    this.selectedExercise = 'Choose a Exercise';
    this.muscleGroupChange.emit(this.selectedMuscleGroup);
  }

  onAddExercise(exerciseName: string): void {
    if (this.sets.valid) {
      const newExercise: IExercise = {
        exerciseId: this.dailyExercisesService.exercises.length + 1,
        muscleGroup: this.selectedMuscleGroup,
        exerciseName: exerciseName,
        sets: this.sets.value,
      };
      this.dailyExercisesService.addExercise(newExercise);
      this.selectedMuscleGroup = 'Choose a Muscle Group';
      this.selectedExercise = 'Choose a Exercise';
      this.sets.reset();
    }
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
