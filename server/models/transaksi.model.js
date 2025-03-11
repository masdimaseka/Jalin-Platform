import mongoose from "mongoose";

const TransaksiSchema = new mongoose.Schema(
  {
    id_transaksi: {
      type: String,
      required: true,
      unique: true,
    },
    id_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id_penjahit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Penjahit",
      required: true,
    },
    judulPekerjaan: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    tenggatWaktu: {
      type: Date,
      required: true,
    },
    review: [
      {
        rating: { type: Number, min: 1, max: 5 },
        content: { type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ["Menunggu", "Diproses", "Selesai", "Dibatalkan"],
      default: "Menunggu",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaksi", TransaksiSchema);
