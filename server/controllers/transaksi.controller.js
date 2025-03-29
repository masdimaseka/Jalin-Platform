import cloudinary from "../lib/cloudinary.js";
import Transaksi from "../models/transaksi.model.js";

export const getTransaksi = async (req, res) => {
  try {
    const now = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(now.getDate() - 3);

    console.log("threeDaysAgo", threeDaysAgo);
    console.log("now", now);

    await Transaksi.updateMany(
      { createdAt: { $lt: threeDaysAgo }, status: "Menunggu" },
      { $set: { status: "Dibatalkan" } }
    );

    const transaksi = await Transaksi.find()
      .populate("user", "name profileImg")
      .populate({
        path: "penjahit",
        select: "user",
        populate: { path: "user", select: "name profileImg" },
      });

    res.json(transaksi);
  } catch (error) {
    console.log(`error in getTransaksi: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createTransaksi = async (req, res) => {
  try {
    const userId = req.user._id;

    const { judul, deskripsi, image, tenggatWaktu } = req.body;

    const transaksiBaru = new Transaksi({
      user: userId,
      judul,
      deskripsi,
      image,
      tenggatWaktu,
    });

    await transaksiBaru.save();

    res.status(201).json({
      message: "Transaksi berhasil dibuat",
      transaksi: transaksiBaru,
    });
  } catch (error) {
    console.error(`Error di createTransaksi: ${error.message}`);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
export const createTransaksiToPenjahit = async (req, res) => {
  try {
    const userId = req.user._id;
    const penjahitId = req.params.id;

    const { judul, deskripsi, image, tenggatWaktu } = req.body;

    const uploadedImg = await cloudinary.uploader.upload(image, {
      folder: "jalin/transaksi",
    });

    const transaksiBaru = new Transaksi({
      user: userId,
      penjahit: penjahitId,
      judul,
      deskripsi,
      image: uploadedImg.secure_url,
      tenggatWaktu,
    });

    await transaksiBaru.save();

    res.status(201).json({
      message: "Transaksi berhasil dibuat",
      transaksi: transaksiBaru,
    });
  } catch (error) {
    console.error(`Error di createTransaksi: ${error.message}`);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
