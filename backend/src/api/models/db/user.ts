import mongoose, { Schema, Document } from 'mongoose';

interface IUserDB extends Document {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage?: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  height: number;
  weight: number;
  activityLevel: number;
  weightGoal:
    | 'maintain'
    | 'mildlose'
    | 'weightlose'
    | 'extremelose'
    | 'mildgain'
    | 'weightgain'
    | 'extremegain';
  dietPlan: 'balanced' | 'lowfat' | 'lowcarbs' | 'highprotein';
  failedLoginAttempts?: {
    count: number;
    lastAttempt: Date | null;
  };
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

const UserSchema: Schema = new Schema(
  {
    password: { type: String, required: true },
    firstName: { type: String, required: true, maxLength: 50 },
    lastName: { type: String, required: true, maxLength: 50 },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    profileImage: { type: String },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    age: { type: Number, required: true, min: 0, max: 999 },
    height: { type: Number, required: true, min: 0, max: 119 },
    weight: { type: Number, required: true, min: 0, max: 999 },
    activityLevel: { type: Number, required: true },
    weightGoal: {
      type: String,
      required: true,
      enum: [
        'maintain',
        'mildlose',
        'weightlose',
        'extremelose',
        'mildgain',
        'weightgain',
        'extremegain',
      ],
    },
    dietPlan: {
      type: String,
      required: true,
      enum: ['balanced', 'lowfat', 'lowcarbs', 'highprotein'],
    },
    failedLoginAttempts: {
      count: { type: Number, default: 0 },
      lastAttempt: { type: Date, default: null },
    },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
  },
  {
    collection: 'User',
  }
);

export default mongoose.model<IUserDB>('User', UserSchema);
