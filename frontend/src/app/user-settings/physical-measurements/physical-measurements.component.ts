import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { IPhysicalMeasurements } from '../models/physical-measurements';

@Component({
  selector: 'physical-measurements',
  templateUrl: './physical-measurements.component.html',
  styleUrl: './physical-measurements.component.css',
  standalone: false,
})
export class PhysicalMeasurementsComponent implements OnInit, OnChanges {
  @Input() originalPhysicalMeasurements!: IPhysicalMeasurements;
  @Output() physicalMeasurementsChange =
    new EventEmitter<IPhysicalMeasurements>();

  physicalMeasurements!: IPhysicalMeasurements;
  heightFeet: number = 0;
  heightInches: number = 0;

  ngOnInit(): void {
    this.physicalMeasurements = { ...this.originalPhysicalMeasurements };
    this.convertToFeetAndInches();
  }

  ngOnChanges(): void {
    this.physicalMeasurements = { ...this.originalPhysicalMeasurements };
    this.convertToFeetAndInches();
  }

  convertToFeetAndInches(): void {
    this.heightFeet = Math.floor(this.physicalMeasurements.height / 12);
    this.heightInches = this.physicalMeasurements.height % 12;
  }

  convertyToInches(): void {
    this.physicalMeasurements.height = this.heightFeet * 12 + this.heightInches;
  }

  updatePhysicalMeasurements(): void {
    this.convertyToInches();
    this.physicalMeasurementsChange.emit(this.physicalMeasurements);
  }

  preventInvalidCharacters(event: KeyboardEvent) {
    if (event.key === '-' || event.key === '.' || event.key === 'e') {
      event.preventDefault();
    }
  }

  checkMaxLengthFeet(event: any): void {
    const maxLength = 1;
    let value = Number(event.target.value);
    if (value.toString().length > maxLength) {
      let truncatedValue = Number(value.toString().slice(0, maxLength));
      event.target.value = truncatedValue;
      this.heightFeet = Math.trunc(truncatedValue);
    }
    this.updatePhysicalMeasurements();
  }

  checkMaxLengthInches(event: any): void {
    const maxLength = 2;
    let value = Number(event.target.value);
    if (value.toString().length > maxLength || value > 11) {
      let truncatedValue =
        value > 11 ? 11 : Number(value.toString().slice(0, maxLength));
      event.target.value = truncatedValue;
      this.heightInches = Math.trunc(truncatedValue);
    }
    this.updatePhysicalMeasurements();
  }

  checkMaxLengthWeight(event: any): void {
    const maxLength = 3;
    let value = Number(event.target.value);
    if (value.toString().length > maxLength) {
      let truncatedValue = Number(value.toString().slice(0, maxLength));
      event.target.value = truncatedValue;
      this.physicalMeasurements.weight = Math.trunc(truncatedValue);
    }
    this.updatePhysicalMeasurements();
  }
}
