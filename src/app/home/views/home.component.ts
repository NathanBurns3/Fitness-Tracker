import { Component, OnInit } from '@angular/core';
import { IProfileInfo } from '../models/profile-info';
import { ProfileInfoService } from '../services/profile-info.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  providers: [ProfileInfoService],
})
export class HomeComponent implements OnInit {
  profileInfo!: IProfileInfo;
  today = new Date();
  formattedDate: string = `${this.today.toLocaleString('default', {
    month: 'long',
  })} ${this.today.getDate()}, ${this.today.getFullYear()}`;
  selectedSummary: string = 'Daily';
  formattedHeight!: string;

  constructor(private profileInfoService: ProfileInfoService) {}

  ngOnInit(): void {
    this.profileInfo = this.profileInfoService.getProfileInfo();
    this.formattedHeight = this.formatHeight();
  }

  selectSummary(summary: string) {
    this.selectedSummary = summary;
  }

  formatHeight(): string {
    let heightInInches = this.profileInfo.height;
    let feet = Math.floor(heightInInches / 12);
    let inches = heightInInches % 12;
    return `${feet}' ${inches}"`;
  }
}
