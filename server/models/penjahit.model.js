import mongoose from "mongoose";

const penjahitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, default: "" },
    dokKTP: {
      type: String,
      required: true,
    },
    dokPortofolio: {
      type: [String],
      default: [],
    },
    rentangHarga: {
      type: String,
      required: true,
    },
    kategori: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    openToWork: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    isVerified: {
      type: String,
      enum: ["onreview", "diterima", "ditolak"],
      default: "onreview",
    },
    isAgreeTerms: {
      type: Boolean,
      default: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    point: {
      type: Number,
      default: 5000,
    },
  },
  { timestamps: true }
);

const Penjahit = mongoose.model("Penjahit", penjahitSchema);

export default Penjahit;
