import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IContactInformation } from '../models/contact-information';
import { UserSettingsService } from '../services/user-settings.service';

@Component({
  selector: 'contact-information',
  templateUrl: './contact-information.component.html',
})
export class ContactInformationComponent implements OnInit {
  @Input() originalContactInformation!: IContactInformation;
  @Output() contactInformationChange = new EventEmitter<IContactInformation>();
  contactInformation!: IContactInformation;

  constructor(private userSettingsService: UserSettingsService) {}

  ngOnInit(): void {
    this.contactInformation = { ...this.originalContactInformation };
  }

  ngOnChanges(): void {
    this.contactInformation = { ...this.originalContactInformation };
  }

  updateContactInformation(): void {
    this.contactInformationChange.emit(this.contactInformation);
  }
}
