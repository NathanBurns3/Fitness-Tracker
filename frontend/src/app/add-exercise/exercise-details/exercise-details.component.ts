import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IExercise } from '../models/exercise';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';
import { ExercisesService } from '../services/exercises.service';
import { DailyExercisesService } from '../services/daily-exercises.service';
import { FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'exercise-details',
  templateUrl: './exercise-details.component.html',
})
export class ExerciseDetailsComponent implements OnInit {
  @Output() exerciseDeleted = new EventEmitter<void>();

  muscleGroup!: muscleGroupsEnum | string;
  exercise: string;
  sets: FormControl = new FormControl('');
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
    this.sets.setValue(this.data.exercise.sets);
  }

  ngOnInit(): void {
    this.exercisesService
      .getExercisesById(muscleGroupsEnum[this.muscleGroup as muscleGroupsEnum])
      .pipe(
        map((exercises: IExercise[]) =>
          exercises.map((exercise) => exercise.exerciseName)
        )
      )
      .subscribe((exerciseNames: string[]) => {
        this.exercises = exerciseNames;
      });
  }

  preventInvalidCharacters(event: KeyboardEvent) {
    if (event.key === '-' || event.key === '.' || event.key === 'e') {
      event.preventDefault();
    }
  }

  checkMaxLength(event: any): void {
    const maxLength = 3;
    let value = Number(event.target.value);
    if (value.toString().length > maxLength) {
      let truncatedValue = Number(value.toString().slice(0, maxLength));
      event.target.value = truncatedValue;
      this.sets.setValue(truncatedValue, { emitEvent: false });
    }
  }

  onMuscleGroupChange(selectedMuscleGroup: muscleGroupsEnum | string) {
    this.muscleGroup = selectedMuscleGroup;
    this.exercisesService
      .getExercisesById(muscleGroupsEnum[this.muscleGroup as muscleGroupsEnum])
      .pipe(
        map((exercises: IExercise[]) =>
          exercises.map((exercise) => exercise.exerciseName)
        )
      )
      .subscribe((exerciseNames: string[]) => {
        this.exercises = exerciseNames;
      });
    this.exercise = 'Choose a Exercise';
  }

  closeEditExercise() {
    this.dialogRef.close();
  }

  saveExercise() {
    this.data.exercise.muscleGroup = this.muscleGroup;
    this.data.exercise.exerciseName = this.exercise;
    this.data.exercise.sets = this.sets.value;
    this.dailyExercisesService
      .updateExercise(this.data.exercise)
      .subscribe((success: boolean) => {
        if (success) {
          this.dialogRef.close();
        }
      });
  }

  deleteExercise() {
    this.dailyExercisesService
      .deleteExercise(this.data.exercise)
      .subscribe((success: boolean) => {
        if (success) {
          this.exerciseDeleted.emit();
          this.dialogRef.close();
        }
      });
  }
}
