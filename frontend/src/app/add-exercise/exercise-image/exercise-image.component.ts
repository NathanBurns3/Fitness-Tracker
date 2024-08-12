import { Component, Input } from '@angular/core';

@Component({
  selector: 'exercise-image',
  templateUrl: './exercise-image.component.html',
  styleUrls: ['./exercise-image.component.css'],
})
export class ExerciseImageComponent {
  @Input() selectedMuscleGroup: string = '';
  defaultImage = 'assets/muscle-group-images/Blank.png';
  exerciseImageMap: { [key: string]: string } = {
    Abs: 'assets/muscle-group-images/Abs.png',
    Back: 'assets/muscle-group-images/Back.png',
    Biceps: 'assets/muscle-group-images/Biceps.png',
    Calves: 'assets/muscle-group-images/Calves.png',
    Chest: 'assets/muscle-group-images/Chest.png',
    Forearms: 'assets/muscle-group-images/Forearms.png',
    Glutes: 'assets/muscle-group-images/Glutes.png',
    Hamstrings: 'assets/muscle-group-images/Hamstrings.png',
    Quads: 'assets/muscle-group-images/Quads.png',
    Shoulders: 'assets/muscle-group-images/Shoulders.png',
    Triceps: 'assets/muscle-group-images/Triceps.png',
  };

  get imageUrl(): string {
    return this.exerciseImageMap[this.selectedMuscleGroup] || this.defaultImage;
  }
}
