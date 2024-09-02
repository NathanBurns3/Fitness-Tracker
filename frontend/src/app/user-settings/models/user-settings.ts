import { IActivityGoal } from './activity-goals';
import { IContactInformation } from './contact-information';
import { DietEnum } from './diet-enum';
import { IPersonalInformation } from './personal-information';
import { IPhysicalMeasurements } from './physical-measurements';

export interface IUserSettings {
  personalInformation: IPersonalInformation;
  contactInformation: IContactInformation;
  physicalMeasurements: IPhysicalMeasurements;
  activityGoal: IActivityGoal;
  dietPlan: DietEnum;
}
