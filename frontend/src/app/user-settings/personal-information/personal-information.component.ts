import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { IPersonalInformation } from '../models/personal-information';
import { GenderEnum } from '../models/gender-enum';

@Component({
    selector: 'personal-information',
    templateUrl: './personal-information.component.html',
    styleUrls: ['./personal-information.component.css'],
    standalone: false
})
export class PersonalInformationComponent implements OnInit, OnChanges {
  @Input() originalPersonalInformation!: IPersonalInformation;
  @Output() personalInformationChange =
    new EventEmitter<IPersonalInformation>();

  personalInformation!: IPersonalInformation;
  previewImage: string = '';
  genderLabels = {
    [GenderEnum.Male]: 'Male',
    [GenderEnum.Female]: 'Female',
    [GenderEnum.Other]: 'Other',
  };

  ngOnInit(): void {
    this.personalInformation = { ...this.originalPersonalInformation };
    this.previewImage = this.personalInformation.profilePicture;
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          const size = Math.min(img.width, img.height);

          canvas.width = size;
          canvas.height = size;

          ctx.drawImage(
            img,
            (img.width - size) / 2,
            (img.height - size) / 2,
            size,
            size,
            0,
            0,
            size,
            size
          );

          const resizedImage = canvas.toDataURL('image/png');
          this.previewImage = resizedImage;
          this.personalInformation.profilePicture = resizedImage;
          this.updatePersonalInformation();
        };
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

  preventInvalidCharacters(event: KeyboardEvent) {
    if (event.key === '-' || event.key === '.' || event.key === 'e') {
      event.preventDefault();
    }
  }

  checkMaxLength(event: any): void {
    const maxLength = 3;
    let value = Number(event.target.value);
    if (value.toString().length > maxLength) {
      let truncatedValue = Number(value.toString().slice(0, maxLength));
      event.target.value = truncatedValue;
      this.personalInformation.age = Math.trunc(truncatedValue);
    }
    this.updatePersonalInformation();
  }
}
