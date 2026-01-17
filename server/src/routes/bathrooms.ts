import { Router } from "express";
import { Types } from "mongoose";
import { z } from "zod";
import { Bathroom } from "../models/Bathroom.js";
import { Rating } from "../models/Rating.js";

const router = Router();

const listQuerySchema = z.object({
  q: z.string().optional(),
  buildingCode: z.string().optional(),
});

const toMatch = (query: string) => ({
  $regex: query,
  $options: "i",
});

router.get("/", async (req, res) => {
  const parsed = listQuerySchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { q, buildingCode } = parsed.data;
  const match: Record<string, unknown> = {};
  if (q) {
    match.$or = [{ name: toMatch(q) }, { buildingName: toMatch(q) }, { buildingCode: toMatch(q) }];
  }
  if (buildingCode) match.buildingCode = buildingCode;

  const bathrooms = await Bathroom.aggregate([
    { $match: match },
    {
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "bathroomId",
        as: "ratings",
      },
    },
    {
      $addFields: {
        ratingCount: { $size: "$ratings" },
        avgRating: {
          $cond: [{ $gt: [{ $size: "$ratings" }, 0] }, { $avg: "$ratings.stars" }, 0],
        },
      },
    },
    { $project: { ratings: 0 } },
  ]);

  res.json({ bathrooms });
});

router.get("/top10", async (_req, res) => {
  const global = await Rating.aggregate([
    { $group: { _id: null, avg: { $avg: "$stars" }, count: { $sum: 1 } } },
  ]);
  const globalAvg = global[0]?.avg ?? 0;
  const m = 5;

  const bathrooms = await Bathroom.aggregate([
    {
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "bathroomId",
        as: "ratings",
      },
    },
    {
      $addFields: {
        ratingCount: { $size: "$ratings" },
        avgRating: {
          $cond: [{ $gt: [{ $size: "$ratings" }, 0] }, { $avg: "$ratings.stars" }, 0],
        },
      },
    },
    {
      $addFields: {
        score: {
          $cond: [
            { $gt: ["$ratingCount", 0] },
            {
              $divide: [
                {
                  $add: [
                    { $multiply: ["$ratingCount", "$avgRating"] },
                    { $multiply: [m, globalAvg] },
                  ],
                },
                { $add: ["$ratingCount", m] },
              ],
            },
            globalAvg,
          ],
        },
      },
    },
    { $project: { ratings: 0 } },
    { $sort: { ratingCount: -1, score: -1 } },
    { $limit: 10 },
  ]);

  res.json({ bathrooms });
});

router.get("/:id", async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: "Invalid id" });
  const bathroomId = new Types.ObjectId(req.params.id);

  const bathroom = await Bathroom.aggregate([
    { $match: { _id: bathroomId } },
    {
      $lookup: {
        from: "ratings",
        localField: "_id",
        foreignField: "bathroomId",
        as: "ratings",
      },
    },
    {
      $addFields: {
        ratingCount: { $size: "$ratings" },
        avgRating: {
          $cond: [{ $gt: [{ $size: "$ratings" }, 0] }, { $avg: "$ratings.stars" }, 0],
        },
      },
    },
    { $project: { ratings: 0 } },
  ]);

  if (!bathroom[0]) return res.status(404).json({ error: "Not found" });
  res.json({ bathroom: bathroom[0] });
});

export default router;
