import { IActivityGoal } from './activity-goals';
import { IContactInformation } from './contact-information';
import { IPersonalInformation } from './personal-information';
import { IPhysicalMeasurements } from './physical-measurements';

export interface IUserSettings {
  personalInformation: IPersonalInformation;
  contactInformation: IContactInformation;
  physicalMeasurements: IPhysicalMeasurements;
  activityGoal: IActivityGoal;
  dietPlan: string;
}
