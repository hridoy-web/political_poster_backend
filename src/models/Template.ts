import mongoose, { Schema, Document } from 'mongoose';

export interface ITemplate extends Document {
    title: string;
    occasionType: string;
    thumbnailUrl: string;
    htmlLayout: string;
    layoutConfig?: object;
    isActive: boolean;
}

const templateSchema = new Schema<ITemplate>(
    {
        title: {
            type: String,
            required: true
        },
        occasionType: {
            type: String,
            required: true,
            index: true
        },
        thumbnailUrl: {
            type: String,
            required: true
        },
        htmlLayout: {
            type: String,
            required: true
        },
        layoutConfig: { type: Schema.Types.Mixed },
        isActive: {
            type: Boolean,
            default: true
        },
    },
    { timestamps: true }
)

export const Template = mongoose.model<ITemplate>('Template', templateSchema)