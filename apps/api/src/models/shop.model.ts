import { Schema, model, Document } from 'mongoose';
import { ShopDTO } from '@mallcity/shared';

export interface ShopDocument extends Document, Omit<ShopDTO, 'id' | '_id'> {}

const shopSchema = new Schema<ShopDocument>(
  {
    name: {
      type: String,
      required: [true, 'Shop name is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City name is required'],
      trim: true,
    },
    mallName: {
      type: String,
      required: [true, 'Mall name is required'],
      trim: true,
    },
    mallId: {
      type: String,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    shopType: {
      type: String,
      required: [true, 'Shop category/type is required'],
      index: true,
    },
    floorNo: {
      type: String,
      required: [true, 'Floor number is required'],
      index: true,
    },
    shopImg: {
      type: String,
      required: [true, 'Shop image is required'],
    },
    address: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
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

export const ShopModel = model<ShopDocument>('Shop', shopSchema);
