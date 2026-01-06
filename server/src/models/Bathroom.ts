import { Schema, model, Types } from "mongoose";

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IBathroom {
  name: string;
  buildingCode: string;
  buildingName: string;
  location: ILocation;
  tags?: string[];
  createdAt: Date;
}

const bathroomSchema = new Schema<IBathroom>(
  {
    name: { type: String, required: true, trim: true },
    buildingCode: { type: String, required: true, trim: true },
    buildingName: { type: String, required: true, trim: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    tags: [{ type: String }],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Bathroom = model<IBathroom>("Bathroom", bathroomSchema);
