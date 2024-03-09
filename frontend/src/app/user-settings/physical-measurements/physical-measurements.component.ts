import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from '../services/user-settings.service';
import { IPhysicalMeasurements } from '../models/physical-measurements';

@Component({
  selector: 'physical-measurements',
  templateUrl: './physical-measurements.component.html',
})
export class PhysicalMeasurementsComponent implements OnInit {
  physicalMeasurements!: IPhysicalMeasurements;
  heightFeet: number = 0;
  heightInches: number = 0;

  constructor(private userSettingsService: UserSettingsService) {}

  ngOnInit(): void {
    this.physicalMeasurements = {
      ...this.userSettingsService.getPhysicalMeasurements(),
    };
    this.convertToFeetAndInches();
  }

  convertToFeetAndInches(): void {
    this.heightFeet = Math.floor(this.physicalMeasurements.height / 12);
    this.heightInches = this.physicalMeasurements.height % 12;
  }

  convertyToInches(): void {
    this.physicalMeasurements.height = this.heightFeet * 12 + this.heightInches;
  }
}
