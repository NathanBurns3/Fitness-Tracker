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

  constructor(private profileInfoService: ProfileInfoService) {}

  ngOnInit(): void {
    this.profileInfo = this.profileInfoService.getProfileInfo();
  }

  selectSummary(summary: string) {
    this.selectedSummary = summary;
  }
}
