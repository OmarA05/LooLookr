import { Schema, model, Types } from "mongoose";

export interface IRating {
  userId: Types.ObjectId;
  bathroomId: Types.ObjectId;
  stars: number;
  createdAt: Date;
}

const ratingSchema = new Schema<IRating>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bathroomId: { type: Schema.Types.ObjectId, ref: "Bathroom", required: true },
    stars: { type: Number, required: true, min: 0, max: 5 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

ratingSchema.index({ userId: 1, bathroomId: 1 }, { unique: true });

export const Rating = model<IRating>("Rating", ratingSchema);
