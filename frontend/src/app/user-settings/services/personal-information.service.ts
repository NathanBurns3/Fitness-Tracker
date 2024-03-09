import { Injectable } from '@angular/core';
import { IPersonalInformation } from '../models/personal-information';

@Injectable({
  providedIn: 'root',
})
export class PersonalInformationService {
  personalInformation: IPersonalInformation = {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    age: 21,
    profilePicture: './assets/testProfilePicture.jpg',
  };

  getPersonalInformation(): IPersonalInformation {
    return this.personalInformation;
  }

  updatePersonalInformation(personalInformation: IPersonalInformation): void {
    this.personalInformation = personalInformation;
  }
}
