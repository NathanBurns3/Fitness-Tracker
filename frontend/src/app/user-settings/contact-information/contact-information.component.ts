import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IContactInformation } from '../models/contact-information';

@Component({
  selector: 'contact-information',
  templateUrl: './contact-information.component.html',
})
export class ContactInformationComponent implements OnInit {
  @Input() originalContactInformation!: IContactInformation;
  @Output() contactInformationChange = new EventEmitter<IContactInformation>();
  contactInformation!: IContactInformation;

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
