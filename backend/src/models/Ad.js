import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ad name is required'],
    trim: true
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  type: {
    type: String,
    required: [true, 'Ad type is required'],
    enum: ['image', 'video', 'carousel', 'story']
  },
  content: {
    title: {
      type: String,
      required: [true, 'Ad title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Ad description is required'],
      trim: true
    },
    media: [{
      type: String,
      required: [true, 'Media URL is required']
    }],
    callToAction: {
      type: String,
      required: [true, 'Call to action is required'],
      enum: ['learn_more', 'shop_now', 'sign_up', 'contact_us', 'download']
    }
  },
  targeting: {
    ageRange: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 65 }
    },
    locations: [String],
    interests: [String]
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'completed'],
    default: 'draft'
  },
  metrics: {
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    spend: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});
adSchema.index({ campaign: 1, createdAt: -1 });
adSchema.index({ status: 1 });

const Ad = mongoose.model('Ad', adSchema);

export default Ad; 