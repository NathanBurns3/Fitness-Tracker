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

  numberOnly(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
