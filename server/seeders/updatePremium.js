import mongoose from "mongoose";
import Penjahit from "../models/penjahit.model.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateAllPenjahits() {
  await Penjahit.updateMany({}, { $set: { isPremium: false } });
  console.log("Berhasil update semua user dengan isPremium: false");
  mongoose.connection.close();
}

updateAllPenjahits();
