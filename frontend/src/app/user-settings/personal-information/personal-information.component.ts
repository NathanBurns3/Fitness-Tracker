import { Component, OnInit } from '@angular/core';
import { IPersonalInformation } from '../models/personal-information';
import { UserSettingsService } from '../services/user-settings.service';

@Component({
  selector: 'personal-information',
  templateUrl: './personal-information.component.html',
})
export class PersonalInformationComponent implements OnInit {
  personalInformation!: IPersonalInformation;
  previewImage: string = '';
  genderOptions: string[] = ['Male', 'Female', 'Other'];

  constructor(private userSettingsService: UserSettingsService) {}

  ngOnInit(): void {
    this.personalInformation = {
      ...this.userSettingsService.getPersonalInformation(),
    };
    this.previewImage = this.personalInformation.profilePicture;
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }
}
