import { Schema, model, Document } from 'mongoose';
import { CityDTO } from '@mallcity/shared';

export interface CityDocument extends Document, Omit<CityDTO, 'id' | '_id'> {}

const citySchema = new Schema<CityDocument>(
  {
    name: {
      type: String,
      required: [true, 'City name is required'],
      trim: true,
    },
    cityCode: {
      type: Number,
      required: [true, 'City code is required'],
      unique: true,
      index: true,
    },
    state: {
      type: String,
      required: [true, 'State name is required'],
      trim: true,
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

export const CityModel = model<CityDocument>('City', citySchema);
