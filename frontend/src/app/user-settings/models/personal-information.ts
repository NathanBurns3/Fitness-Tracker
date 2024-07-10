import { GenderEnum } from './gender-enum';

export interface IPersonalInformation {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  age: number;
  profilePicture: string;
}
