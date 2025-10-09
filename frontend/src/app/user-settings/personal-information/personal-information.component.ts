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
  styleUrl: './personal-information.component.css',
  standalone: false,
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

          const maxSize = 200;

          const size = Math.min(img.width, img.height);

          const cropX = (img.width - size) / 2;
          const cropY = (img.height - size) / 2;

          canvas.width = maxSize;
          canvas.height = maxSize;

          ctx.drawImage(img, cropX, cropY, size, size, 0, 0, maxSize, maxSize);

          const compressedDataURL = canvas.toDataURL('image/jpeg', 0.7);
          this.previewImage = compressedDataURL;
          this.personalInformation.profilePicture = compressedDataURL;
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
