/*
TODO:
clean up the code
*/

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IExercise } from '../models/exercise';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';
import { ExercisesService } from '../services/exercises.service';
import { DailyExercisesService } from '../services/daily-exercises.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'exercise-details',
  templateUrl: './exercise-details.component.html',
})
export class ExerciseDetailsComponent implements OnInit {
  muscleGroup!: muscleGroupsEnum | string;
  exercise: string;
  sets: FormControl;
  exercises: string[] = [];
  muscleGroups: muscleGroupsEnum[] = Object.values(muscleGroupsEnum);

  constructor(
    private exercisesService: ExercisesService,
    private dailyExercisesService: DailyExercisesService,
    public dialogRef: MatDialogRef<ExerciseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { exercise: IExercise }
  ) {
    this.muscleGroup = this.data.exercise.muscleGroup as muscleGroupsEnum;
    this.exercise = this.data.exercise.exerciseName;
    this.sets = new FormControl(this.data.exercise.sets, [
      Validators.required,
      Validators.min(1),
      Validators.max(999),
    ]);
  }

  ngOnInit(): void {
    this.exercises = this.exercisesService.getExercisesById(
      this.muscleGroup as muscleGroupsEnum
    );
  }

  onMuscleGroupChange(selectedMuscleGroup: muscleGroupsEnum | string) {
    this.muscleGroup = selectedMuscleGroup;
    this.exercises = this.exercisesService.getExercisesById(
      this.muscleGroup as muscleGroupsEnum
    );
    this.exercise = 'Choose a Exercise';
  }

  closeEditExercise() {
    this.dialogRef.close();
  }

  saveExercise() {
    if (this.sets.valid) {
      this.data.exercise.muscleGroup = this.muscleGroup;
      this.data.exercise.exerciseName = this.exercise;
      this.data.exercise.sets = this.sets.value;
      this.dailyExercisesService.updateExercise(this.data.exercise);
      this.dialogRef.close();
    }
  }

  deleteExercise() {
    this.dailyExercisesService.deleteExercise(this.data.exercise);
    this.dialogRef.close();
  }
}
