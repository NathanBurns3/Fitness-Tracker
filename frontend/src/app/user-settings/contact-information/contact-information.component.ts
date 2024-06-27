import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { IContactInformation } from '../models/contact-information';

@Component({
  selector: 'contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.css'],
})
export class ContactInformationComponent implements OnInit, OnChanges {
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
