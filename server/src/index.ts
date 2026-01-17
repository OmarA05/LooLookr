import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
const mongoUri = process.env.MONGO_URI;

const start = async () => {
  if (!mongoUri) {
    throw new Error("Missing MONGO_URI");
  }

  await mongoose.connect(mongoUri);
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
