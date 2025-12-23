import { Types } from 'mongoose';

export interface ISubscription {
  numberOfGames?: {
    type: number;
    required:true
  },
  price: {
    type:number,
    required:true
  },
  currency: string;
  interval?: 'monthly' | 'yearly';
  features: string[];
  isActive: boolean;
  title: string;
  totalSubscripeUser?: Types.ObjectId[];
}