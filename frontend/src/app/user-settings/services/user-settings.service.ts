import { Injectable } from '@angular/core';
import { IPersonalInformation } from '../models/personal-information';
import { IContactInformation } from '../models/contact-information';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  personalInformation: IPersonalInformation = {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    age: 21,
    profilePicture: './assets/testProfilePicture.jpg',
  };

  contactInformation: IContactInformation = {
    email: 'testEmail@gmail.com',
    phoneNumber: '123-456-7890',
  };

  physicalMeasurements = {
    height: 75,
    weight: 180,
  };

  getPersonalInformation(): IPersonalInformation {
    return this.personalInformation;
  }

  updatePersonalInformation(personalInformation: IPersonalInformation): void {
    this.personalInformation = personalInformation;
  }

  getContactInformation(): IContactInformation {
    return this.contactInformation;
  }

  updateContactInformation(contactInformation: IContactInformation): void {
    this.contactInformation = contactInformation;
  }

  getPhysicalMeasurements() {
    return this.physicalMeasurements;
  }

  updatePhysicalMeasurements(physicalMeasurements: any) {
    this.physicalMeasurements = physicalMeasurements;
  }
}
