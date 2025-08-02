import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExercisesService } from '../services/exercises.service';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';
import { map } from 'rxjs';
import { IExercise } from '../models/exercise';

@Component({
  selector: 'delete-exercise',
  templateUrl: './delete-exercise.component.html',
  styleUrl: './delete-exercise.component.css',
  standalone: false,
})
export class DeleteExerciseComponent {
  @Output() exerciseDeleted = new EventEmitter<void>();

  muscleGroup!: muscleGroupsEnum | string;
  exercise!: IExercise;
  exercises: IExercise[] = [];
  muscleGroups: muscleGroupsEnum[] = Object.values(muscleGroupsEnum);

  constructor(
    public dialogRef: MatDialogRef<DeleteExerciseComponent>,
    private exercisesService: ExercisesService,
  ) {}

  closeDeleteExercise() {
    this.dialogRef.close();
  }

  onMuscleGroupChange(selectedMuscleGroup: muscleGroupsEnum | string) {
    this.muscleGroup = selectedMuscleGroup;
    if (this.muscleGroup !== 'Choose a Muscle Group') {
      this.exercisesService
        .getExercisesById(
          muscleGroupsEnum[this.muscleGroup as muscleGroupsEnum],
        )
        .pipe(map((exercises: IExercise[]) => exercises))
        .subscribe((exercises: IExercise[]) => {
          this.exercises = exercises;
        });
    }
    this.exercise = {} as IExercise;
  }

  deleteExercise() {
    if (this.exercise) {
      this.exercisesService
        .deleteExercise(
          this.muscleGroup as muscleGroupsEnum,
          this.exercise.exerciseID,
          this.exercise.exerciseName,
        )
        .subscribe((success: boolean) => {
          if (success) {
            this.exerciseDeleted.emit();
            this.dialogRef.close();
          }
        });
    }
  }
}
