import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { DietEnum } from '../models/diet-enum';

@Component({
  selector: 'diet-selection',
  templateUrl: './diet-selection.component.html',
})
export class DietSelectionComponent implements OnInit, OnChanges {
  @Input() originalDietSelection!: string;
  @Output() dietSelectionChange = new EventEmitter<string>();

  dietLabels = {
    [DietEnum.Balanced]: 'Balanced',
    [DietEnum.LowFat]: 'Low Fat',
    [DietEnum.LowCarbs]: 'Low Carb',
    [DietEnum.highProtein]: 'High Protein',
  };
  selectedDiet!: DietEnum;
  diet!: string;

  ngOnInit(): void {
    this.diet = this.originalDietSelection;
    this.selectedDiet = this.diet as DietEnum;
  }

  ngOnChanges(): void {
    this.diet = this.originalDietSelection;
    this.selectedDiet = this.diet as DietEnum;
  }

  updateDietSelection(): void {
    this.diet = this.selectedDiet;
    this.dietSelectionChange.emit(this.diet);
  }
}
