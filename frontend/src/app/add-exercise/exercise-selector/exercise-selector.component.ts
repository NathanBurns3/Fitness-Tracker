import { Component, EventEmitter, Output } from '@angular/core';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';
import { IExercise } from '../models/exercise';
import { ExercisesService } from '../services/exercises.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewExerciseComponent } from '../add-new-exercise/add-new-exercise.component';
import { DeleteExerciseComponent } from '../delete-exercise/delete-exercise.component';
import { DailyExercisesService } from '../services/daily-exercises.service';
import { FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'exercise-selector',
  templateUrl: './exercise-selector.component.html',
  styleUrl: './exercise-selector.component.css',
  standalone: false,
})
export class ExerciseSelectorComponent {
  @Output() muscleGroupChange = new EventEmitter<string>();

  muscleGroups = Object.values(muscleGroupsEnum);
  selectedMuscleGroup = 'Choose a Muscle Group';
  selectedExercise = 'Choose a Exercise';
  exercises: string[] = [];
  sets: FormControl = new FormControl('');

  constructor(
    private exercisesService: ExercisesService,
    private dailyExercisesService: DailyExercisesService,
    private dialog: MatDialog,
  ) {}

  onMuscleGroupChange() {
    if (this.selectedMuscleGroup !== 'Choose a Muscle Group') {
      this.exercisesService
        .getExercisesById(
          muscleGroupsEnum[this.selectedMuscleGroup as muscleGroupsEnum],
        )
        .pipe(
          map((exercises: IExercise[]) =>
            exercises.map((exercise) => exercise.exerciseName),
          ),
        )
        .subscribe((exerciseNames: string[]) => {
          this.exercises = exerciseNames;
        });
      this.selectedExercise = 'Choose a Exercise';
      this.muscleGroupChange.emit(this.selectedMuscleGroup);
    }
  }

  onAddExercise(exerciseName: string): void {
    const newExercise: IExercise = {
      exerciseID: 'test',
      muscleGroup: this.selectedMuscleGroup,
      exerciseName: exerciseName,
      sets: this.sets.value,
    };
    this.dailyExercisesService
      .addExercise(newExercise)
      .subscribe((success: boolean) => {
        if (success) {
          this.selectedMuscleGroup = 'Choose a Muscle Group';
          this.selectedExercise = 'Choose a Exercise';
          this.sets.reset();
        }
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

  openAddNewExerciseDialog() {
    const dialogRef = this.dialog.open(AddNewExerciseComponent, {
      width: '500px',
      height: '500px',
    });

    dialogRef.componentInstance.exerciseAdded.subscribe(() => {
      this.onMuscleGroupChange();
    });
  }

  openDeleteExerciseDialog() {
    const dialogRef = this.dialog.open(DeleteExerciseComponent, {
      width: '500px',
      height: '500px',
    });

    dialogRef.componentInstance.exerciseDeleted.subscribe(() => {
      this.onMuscleGroupChange();
    });
  }
}
