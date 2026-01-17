import { Router } from "express";
import { Types } from "mongoose";
import { z } from "zod";
import { Rating } from "../models/Rating.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const ratingSchema = z.object({
  bathroomId: z.string(),
  stars: z.coerce.number().int().min(0).max(5),
});

const ratingSummary = async (bathroomId: Types.ObjectId) => {
  const summary = await Rating.aggregate([
    { $match: { bathroomId } },
    {
      $group: {
        _id: "$bathroomId",
        avgRating: { $avg: "$stars" },
        ratingCount: { $sum: 1 },
      },
    },
  ]);
  return summary[0] ?? { avgRating: 0, ratingCount: 0 };
};

router.post("/", requireAuth, async (req, res) => {
  const parsed = ratingSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { bathroomId, stars } = parsed.data;
  if (!Types.ObjectId.isValid(bathroomId)) return res.status(400).json({ error: "Invalid id" });
  if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

  const bathroomObjectId = new Types.ObjectId(bathroomId);
  const userObjectId = new Types.ObjectId(req.userId);

  await Rating.findOneAndUpdate(
    { userId: userObjectId, bathroomId: bathroomObjectId },
    { $set: { stars } },
    { upsert: true, new: true }
  );

  const summary = await ratingSummary(bathroomObjectId);
  res.json({ bathroomId, ...summary });
});

router.get("/mine", requireAuth, async (req, res) => {
  const ratings = await Rating.find({ userId: req.userId });
  res.json({ ratings });
});

export default router;
