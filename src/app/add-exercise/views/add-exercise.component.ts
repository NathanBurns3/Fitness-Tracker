import { Component } from '@angular/core';

@Component({
  selector: 'add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css'],
})
export class AddExerciseComponent {
  selectedMuscleGroup: string = '';

  onMuscleGroupChange(muscleGroup: string) {
    this.selectedMuscleGroup = muscleGroup;
  }
}
