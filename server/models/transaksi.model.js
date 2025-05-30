import mongoose from "mongoose";

const TransaksiSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    penjahit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Penjahit",
      default: null,
    },
    judul: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      default: [],
    },
    tenggatWaktu: {
      type: Date,
      required: true,
    },
    alamat: {
      type: String,
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
      enum: [
        "Menunggu",
        "Diproses",
        "Selesai",
        "Dibatalkan",
        "Dibatalkan Sistem",
        "Ditolak",
      ],
      default: "Menunggu",
    },
    pengerjaan: {
      type: String,
      enum: ["diantar ke penjahit", "diambil oleh penjahit"],
      default: "diantar ke penjahit",
    },
    catatan: {
      type: String,
    },
    imageSelesai: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaksi", TransaksiSchema);
