/*
TODO:
validation on save
  sets is a number and greater than 0 and under a certain number (100?)
    should disable save button if not valid
clean up the code
give confirmation message on save/delete
*/

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IExercise } from '../models/exercise';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';
import { ExercisesService } from '../services/exercises.service';
import { DailyExercisesService } from '../services/daily-exercises.service';

@Component({
  selector: 'exercise-details',
  templateUrl: './exercise-details.component.html',
})
export class ExerciseDetailsComponent implements OnInit {
  muscleGroup!: muscleGroupsEnum | string;
  exercise: string;
  sets: number;
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
    this.sets = this.data.exercise.sets;
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
    this.data.exercise.muscleGroup = this.muscleGroup;
    this.data.exercise.exerciseName = this.exercise;
    this.data.exercise.sets = this.sets;
    this.dailyExercisesService.updateExercise(this.data.exercise);
    this.dialogRef.close();
  }

  deleteExercise() {
    this.dailyExercisesService.deleteExercise(this.data.exercise);
    this.dialogRef.close();
  }
}
