import { Schema, model, Document } from 'mongoose';
import { MallDTO } from '@mallcity/shared';

export interface MallDocument extends Document, Omit<MallDTO, 'id' | '_id'> {}

const mallSchema = new Schema<MallDocument>(
  {
    name: {
      type: String,
      required: [true, 'Mall name is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City name is required'],
      trim: true,
    },
    cityCode: {
      type: Number,
      required: [true, 'City code is required'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    noOffloor: {
      type: Number,
      required: [true, 'Number of floors is required'],
      min: 1,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    mallImg: {
      type: String,
      required: [true, 'Mall image is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret: any) => {
        ret.id = ret._id ? ret._id.toString() : '';
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

export const MallModel = model<MallDocument>('Mall', mallSchema);
