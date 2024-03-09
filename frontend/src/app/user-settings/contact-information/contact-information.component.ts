import { Component, OnInit } from '@angular/core';
import { IContactInformation } from '../models/contact-information';
import { UserSettingsService } from '../services/user-settings.service';

@Component({
  selector: 'contact-information',
  templateUrl: './contact-information.component.html',
})
export class ContactInformationComponent implements OnInit {
  contactInformation!: IContactInformation;

  constructor(private userSettingsService: UserSettingsService) {}

  ngOnInit(): void {
    this.contactInformation = {
      ...this.userSettingsService.getContactInformation(),
    };
  }
}
