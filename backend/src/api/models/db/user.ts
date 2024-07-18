import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  userName: string;
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
  activityLevel: '2' | '3' | '4' | '6';
  weightGoal:
    | 'maintain'
    | 'mildlose'
    | 'weightlose'
    | 'extremelose'
    | 'mildgain'
    | 'weightgain'
    | 'extremegain';
  dietPlan: 'balanced' | 'lowfat' | 'lowcarbs' | 'highprotein';
}

const UserSchema: Schema = new Schema({
  userName: { type: String, required: true, maxLength: 50 },
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
  activityLevel: { type: String, required: true, enum: ['2', '3', '4', '6'] },
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
});

export default mongoose.model<IUser>('User', UserSchema);
