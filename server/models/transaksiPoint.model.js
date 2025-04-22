import mongoose from "mongoose";

const transaksiPointSchema = new mongoose.Schema(
  {
    penjahit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Penjahit",
      required: true,
    },
    point: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PointProduct",
      required: true,
    },
    pointAwal: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const TransaksiPoint = mongoose.model("TransaksiPoint", transaksiPointSchema);
export default TransaksiPoint;
