import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      default: '',
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['player', 'admin'],
      required: true,
      default: 'player',
    },
    profileImage: {
      type: String,
    },
    phone: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    stripeAccountId: {
      type: String,
    },

    // user profile
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    hight: {
      type: String,
    },
    weight: {
      type: Number,
    },
    dob: {
      type: String,
    },
    birthdayPlace: {
      type: String,
    },
    citizenship: {
      type: String,
    },
    currentClub: {
      type: String,
    },
    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'League',
      default: null,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },
    foot: {
      type: String,
    },
    position: {
      type: [String],
      default: [],
    },
    agent: {
      type: String,
    },
    socialMedia: {
      type: [String],
      default: [],
    },

    inSchoolOrCollege: {
      type: Boolean,
    },
    satAct: {
      type: String,
    },
    gpa: {
      type: String,
    },

    playingVideo: {
      type: [String],
      default: [],
    },

    subscriptionPlan: {
      type: String,
    },
    subscriptionStatus: {
      type: String,
    },

    // admin profile
    designation: {
      type: String,
    },
    accessLavel: {
      type: [String],
      default: [],
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
