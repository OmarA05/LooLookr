import "dotenv/config";
import mongoose from "mongoose";
import { Bathroom } from "./models/Bathroom.js";

const bathrooms = [
  {
    name: "MC 3rd Floor East",
    buildingCode: "MC",
    buildingName: "Math & Computer",
    location: { lat: 43.47126, lng: -80.5441 },
    tags: ["quiet"],
  },
  {
    name: "MC 2nd Floor South",
    buildingCode: "MC",
    buildingName: "Math & Computer",
    location: { lat: 43.47085, lng: -80.5437 },
    tags: ["accessible"],
  },
  {
    name: "DC Library Ground",
    buildingCode: "DC",
    buildingName: "Davis Centre",
    location: { lat: 43.4732, lng: -80.5424 },
    tags: ["busy"],
  },
  {
    name: "DC Food Court",
    buildingCode: "DC",
    buildingName: "Davis Centre",
    location: { lat: 43.4736, lng: -80.5428 },
    tags: ["high-traffic"],
  },
  {
    name: "SLC Lower Level",
    buildingCode: "SLC",
    buildingName: "Student Life Centre",
    location: { lat: 43.4727, lng: -80.5445 },
    tags: ["busy"],
  },
  {
    name: "SLC 2nd Floor Quiet",
    buildingCode: "SLC",
    buildingName: "Student Life Centre",
    location: { lat: 43.4729, lng: -80.5443 },
    tags: ["quiet"],
  },
  {
    name: "QNC Ground North",
    buildingCode: "QNC",
    buildingName: "Quantum Nano Centre",
    location: { lat: 43.4739, lng: -80.5417 },
    tags: ["accessible"],
  },
  {
    name: "QNC 2nd Floor",
    buildingCode: "QNC",
    buildingName: "Quantum Nano Centre",
    location: { lat: 43.4738, lng: -80.5415 },
  },
  {
    name: "E5 Atrium",
    buildingCode: "E5",
    buildingName: "Engineering 5",
    location: { lat: 43.4721, lng: -80.5402 },
    tags: ["new"],
  },
  {
    name: "E5 6th Floor",
    buildingCode: "E5",
    buildingName: "Engineering 5",
    location: { lat: 43.4724, lng: -80.5404 },
  },
  {
    name: "E7 Ground",
    buildingCode: "E7",
    buildingName: "Engineering 7",
    location: { lat: 43.4725, lng: -80.5392 },
  },
  {
    name: "E7 4th Floor",
    buildingCode: "E7",
    buildingName: "Engineering 7",
    location: { lat: 43.4727, lng: -80.5394 },
  },
  {
    name: "STC Atrium",
    buildingCode: "STC",
    buildingName: "Science Teaching Complex",
    location: { lat: 43.4699, lng: -80.5437 },
  },
  {
    name: "STC 3rd Floor",
    buildingCode: "STC",
    buildingName: "Science Teaching Complex",
    location: { lat: 43.4702, lng: -80.5439 },
  },
  {
    name: "PAC Arena Level",
    buildingCode: "PAC",
    buildingName: "Physical Activities Complex",
    location: { lat: 43.4715, lng: -80.5454 },
    tags: ["locker-room"],
  },
  {
    name: "PAC Pool Level",
    buildingCode: "PAC",
    buildingName: "Physical Activities Complex",
    location: { lat: 43.4713, lng: -80.5451 },
  },
  {
    name: "RCH Basement",
    buildingCode: "RCH",
    buildingName: "RCH",
    location: { lat: 43.4699, lng: -80.5422 },
  },
  {
    name: "RCH 3rd Floor",
    buildingCode: "RCH",
    buildingName: "RCH",
    location: { lat: 43.4701, lng: -80.5424 },
  },
  {
    name: "B1 Ground",
    buildingCode: "B1",
    buildingName: "Biology 1",
    location: { lat: 43.4685, lng: -80.5418 },
  },
  {
    name: "B2 2nd Floor",
    buildingCode: "B2",
    buildingName: "Biology 2",
    location: { lat: 43.4689, lng: -80.5415 },
  },
  {
    name: "ML Ground",
    buildingCode: "ML",
    buildingName: "Modern Languages",
    location: { lat: 43.4703, lng: -80.5449 },
  },
  {
    name: "HH 1st Floor",
    buildingCode: "HH",
    buildingName: "Hagey Hall",
    location: { lat: 43.4695, lng: -80.5429 },
  },
  {
    name: "EV3 Atrium",
    buildingCode: "EV3",
    buildingName: "Environment 3",
    location: { lat: 43.4694, lng: -80.5458 },
  },
  {
    name: "EV2 2nd Floor",
    buildingCode: "EV2",
    buildingName: "Environment 2",
    location: { lat: 43.4692, lng: -80.5456 },
  },
];

const seedBathrooms = async () => {
  const ops = bathrooms.map((bathroom) =>
    Bathroom.updateOne(
      { name: bathroom.name, buildingCode: bathroom.buildingCode },
      { $set: bathroom },
      { upsert: true }
    )
  );
  await Promise.all(ops);
};

const run = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error("Missing MONGO_URI");
  await mongoose.connect(mongoUri);
  await seedBathrooms();
  console.log(`Seeded ${bathrooms.length} bathrooms`);
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
