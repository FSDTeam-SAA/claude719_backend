import mongoose from "mongoose";
import { ISubscription } from "./subscription.interface";

const SubscriptionSchema = new mongoose.Schema <ISubscription>({
  numberOfGames: {
    type: Number,
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    
  },
  interval: {
    type: String,
    enum: ['monthly', 'yearly'],
  },
  features: {
    type: [String],
  },
  isActive: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
  },
  totalSubscripeUser: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const SubscriptionModel = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default SubscriptionModel;