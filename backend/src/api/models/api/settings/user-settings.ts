import { IActivityGoal } from '../settings/activity-goals';
import { IContactInformation } from '../settings/contact-information';
import { IPersonalInformation } from '../settings/personal-information';
import { IPhysicalMeasurements } from '../settings/physical-measurements';
import { DietEnum } from './diet-enum';

export interface IUserSettings {
  personalInformation: IPersonalInformation;
  contactInformation: IContactInformation;
  physicalMeasurements: IPhysicalMeasurements;
  activityGoal: IActivityGoal;
  dietPlan: DietEnum;
}
