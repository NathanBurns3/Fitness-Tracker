import mongoose, { Schema, Document } from 'mongoose';
import { GenderEnum } from '../api/settings/gender-enum';
import { WeightGoalEnum } from '../api/settings/weight-goal-enum';
import { DietEnum } from '../api/settings/diet-enum';

interface IUserSettings {
  personalInformation: {
    firstName: string;
    lastName: string;
    profilePicture?: string;
    gender: GenderEnum;
    age: number;
  };
  contactInformation: {
    email: string;
    phoneNumber: string;
  };
  physicalMeasurements: {
    height: number;
    weight: number;
  };
  activityGoal: {
    Activity: number;
    WeightGoal: WeightGoalEnum;
  };
  dietPlan: DietEnum;
}

export interface IPendingEmail extends Document {
  email: string;
  verificationToken: string;
  verificationExpires: Date;
  userSettings: IUserSettings;
  password: string;
}

const UserSettingsSchema = new Schema<IUserSettings>(
  {
    personalInformation: {
      firstName: { type: String, required: true, maxLength: 50 },
      lastName: { type: String, required: true, maxLength: 50 },
      profilePicture: { type: String },
      gender: {
        type: String,
        required: true,
        enum: Object.values(GenderEnum),
      },
      age: { type: Number, required: true, min: 0, max: 999 },
    },
    contactInformation: {
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    physicalMeasurements: {
      height: { type: Number, required: true, min: 0, max: 119 },
      weight: { type: Number, required: true, min: 0, max: 999 },
    },
    activityGoal: {
      Activity: { type: Number, required: true },
      WeightGoal: {
        type: String,
        required: true,
        enum: Object.values(WeightGoalEnum),
      },
    },
    dietPlan: {
      type: String,
      required: true,
      enum: Object.values(DietEnum),
    },
  },
  { _id: false }
);

const PendingEmailSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    verificationToken: { type: String, required: true },
    verificationExpires: { type: Date, required: true },
    userSettings: { type: UserSettingsSchema, required: true },
    password: { type: String, required: true },
  },
  {
    collection: 'PendingEmails',
    timestamps: true,
  }
);

export default mongoose.model<IPendingEmail>(
  'PendingEmail',
  PendingEmailSchema
);
