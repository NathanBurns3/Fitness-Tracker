import { GenderEnum } from '../settings/gender-enum';

export interface IPersonalInformation {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  age: number;
  profilePicture: string;
}
