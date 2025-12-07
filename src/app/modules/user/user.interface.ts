import { Types } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  role: 'player' | 'admin';
  profileImage?: string;
  phone?: string;
  otp?: string;
  otpExpiry?: Date;
  verified?: boolean;
  stripeAccountId?: string;

  // user profile
  gender?: 'male' | 'female' | 'other';
  hight?: string;
  weight?: number;
  dob?: string;
  birthdayPlace?: string;
  citizenship?: string;
  currentClub?: string;
  league?: Types.ObjectId; //object id of league
  category?: Types.ObjectId;
  foot?: string;
  position?: string[];
  agent?: string;
  socialMedia?: string[];
  inSchoolOrCollege: boolean; // Yes / No
  satAct?: string; // Optional
  gpa?: string;
  playingVideo?: string[];

  subscriptionPlan?: string;
  subscriptionStatus?: string;

  createdAt: Date;
  updatedAt: Date;
}
