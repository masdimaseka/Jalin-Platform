import mongoose from "mongoose";

const penjahitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
    kategori: [{ type: mongoose.Schema.Types.ObjectId, ref: "Kategori" }],
    openToWork: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAgreeTerms: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Penjahit = mongoose.model("Penjahit", penjahitSchema);

export default Penjahit;
