import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { IPersonalInformation } from '../models/personal-information';

@Component({
  selector: 'personal-information',
  templateUrl: './personal-information.component.html',
})
export class PersonalInformationComponent implements OnInit, OnChanges {
  @Input() originalPersonalInformation!: IPersonalInformation;
  @Output() personalInformationChange =
    new EventEmitter<IPersonalInformation>();

  personalInformation!: IPersonalInformation;
  previewImage: string = '';
  genderOptions: string[] = ['Male', 'Female', 'Other'];

  ngOnInit(): void {
    this.personalInformation = { ...this.originalPersonalInformation };
    this.previewImage = this.personalInformation.profilePicture;
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
        this.personalInformation.profilePicture = e.target.result;
        this.updatePersonalInformation();
      };

      reader.readAsDataURL(file);
    }
  }

  ngOnChanges(): void {
    this.personalInformation = { ...this.originalPersonalInformation };
    this.previewImage = this.personalInformation.profilePicture;
  }

  updatePersonalInformation(): void {
    this.personalInformationChange.emit(this.personalInformation);
  }

  numberOnly(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
