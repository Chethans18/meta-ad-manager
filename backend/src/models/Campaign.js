import mongoose from "mongoose";

const { Schema } = mongoose;

const campaignSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Campaign name is required'],
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'completed'],
    default: 'draft'
  },
  budget: {
    type: Number,
    required: [true, 'Budget is required'],
    min: [0, 'Budget cannot be negative']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  platform: {
    type: String,
    enum: ['facebook', 'instagram', 'both'],
    required: [true, 'Platform is required']
  },
  objective: {
    type: String,
    required: [true, 'Campaign objective is required'],
    enum: ['awareness', 'traffic', 'engagement', 'leads', 'sales', 'app_promotion']
  },
  targetAudience: {
    ageRange: {
      min: {
        type: Number,
        min: 13,
        max: 65,
        default: 18
      },
      max: {
        type: Number,
        min: 13,
        max: 65,
        default: 65
      }
    },
    locations: [{
      type: String
    }],
    interests: [{
      type: String
    }]
  },
  creatives: [{
    headline: {
      type: String,
      required: [true, 'Headline is required']
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    cta: {
      type: String,
      enum: ['Learn More', 'Sign Up', 'Shop Now', 'Download'],
      default: 'Learn More'
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required']
    }
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

campaignSchema.index({ createdBy: 1, createdAt: -1 });
campaignSchema.index({ status: 1 });
campaignSchema.index({ startDate: 1, endDate: 1 });


campaignSchema.pre('validate', function (next) {
  if (this.startDate >= this.endDate) {
    return next(new Error('End date must be after start date'));
  }
  if (this.budget <= 0) {
    return next(new Error('Budget must be greater than 0'));
  }
  next();
});

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
