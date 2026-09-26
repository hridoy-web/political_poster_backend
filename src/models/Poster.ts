import mongoose, { Schema, Document } from 'mongoose';

export interface IPoster extends Document {
  userId: mongoose.Types.ObjectId;
  templateId: mongoose.Types.ObjectId;
  formData: {
    name: string;
    designation: string;
    party: string;
    unionOrThanaOrDistrict: string;
    headline: string
  };
  uploadedPhotoUrls: string[];
  generatedImageUrl?: string;
  status: 'draft' | 'generating' | 'completed' | 'failed';
  createdAt: Date
  updatedAt: Date
}

const posterSchema = new Schema<IPoster>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    templateId: {
      type: Schema.Types.ObjectId,
      ref: 'Template',
      required: true
    },
    formData: {
      name: {
        type: String,
        required: true
      },
      designation: {
        type: String,
        required: true
      },
      party: {
        type: String,
        required: true
      },
      unionOrThanaOrDistrict: {
        type: String,
        required: true
      },
      headline: {
        type: String,
        required: true
      }
    },
    uploadedPhotoUrls: {
      type: [String],
      required: true
    },
    generatedImageUrl: {
      type: String
    },
    status: {
      type: String,
      enum: ['draft', 'generating', 'completed', 'failed'],
      default: 'generating'
    },
  },
  { timestamps: true }
);

export const Poster = mongoose.model<IPoster>('Poster', posterSchema);