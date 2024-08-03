import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExercisesService } from '../services/exercises.service';
import { muscleGroupsEnum } from '../models/muscle-groups-enum';
import { map } from 'rxjs';
import { IExercise } from '../models/exercise';

@Component({
  selector: 'delete-exercise',
  templateUrl: './delete-exercise.component.html',
  styleUrls: ['./delete-exercise.component.css'],
})
export class DeleteExerciseComponent {
  muscleGroup!: muscleGroupsEnum | string;
  exercise: string = '';
  exercises: string[] = [];
  muscleGroups: muscleGroupsEnum[] = Object.values(muscleGroupsEnum);

  constructor(
    public dialogRef: MatDialogRef<DeleteExerciseComponent>,
    private exercisesService: ExercisesService
  ) {}

  closeDeleteExercise() {
    this.dialogRef.close();
  }

  onMuscleGroupChange(selectedMuscleGroup: muscleGroupsEnum | string) {
    this.muscleGroup = selectedMuscleGroup;
    if (this.muscleGroup !== 'Choose a Muscle Group') {
      this.exercisesService
        .getExercisesById(
          muscleGroupsEnum[this.muscleGroup as muscleGroupsEnum]
        )
        .pipe(
          map((exercises: IExercise[]) =>
            exercises.map((exercise) => exercise.exerciseName)
          )
        )
        .subscribe((exerciseNames: string[]) => {
          this.exercises = exerciseNames;
        });
    }
    this.exercise = 'Choose a Exercise';
  }

  deleteExercise() {
    this.exercisesService
      .deleteExercise(this.muscleGroup as muscleGroupsEnum, this.exercise)
      .subscribe((success: boolean) => {
        if (success) {
          this.dialogRef.close();
        }
      });
  }
}
