import { sendGetTransactionEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
import Transaksi from "../models/transaksi.model.js";
import User from "../models/user.model.js";
import Penjahit from "./../models/penjahit.model.js";

export const createTransaksi = async (req, res) => {
  try {
    const userId = req.user._id;

    const { judul, deskripsi, image, tenggatWaktu } = req.body;

    let uploadedImgUrl = null;

    if (image) {
      const uploadedImg = await cloudinary.uploader.upload(image, {
        folder: "jalin/transaksi",
      });
      uploadedImgUrl = uploadedImg.secure_url;
    }

    const transaksiBaru = new Transaksi({
      user: userId,
      judul,
      deskripsi,
      image: uploadedImgUrl,
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
    const { judul, deskripsi, image, tenggatWaktu, prosesPengerjaan, catatan } =
      req.body;

    let uploadedImgUrl = null;

    if (image) {
      const uploadedImg = await cloudinary.uploader.upload(image, {
        folder: "jalin/transaksi",
      });
      uploadedImgUrl = uploadedImg.secure_url;
    }

    const transaksi = new Transaksi({
      user: userId,
      penjahit: penjahitId,
      judul,
      deskripsi,
      image: uploadedImgUrl,
      tenggatWaktu: tenggatWaktu ? new Date(tenggatWaktu) : null,
      prosesPengerjaan,
      catatan,
    });

    await transaksi.save();

    const user = await User.findById(userId);
    const penjahit = await Penjahit.findById(penjahitId).populate(
      "user",
      "email"
    );
    await sendGetTransactionEmail(penjahit.user.email, judul, user.name);

    res.status(201).json({
      message: "Transaksi berhasil dibuat",
      transaksi: transaksi,
    });
  } catch (error) {
    console.error(`Error di createTransaksi: ${error.message}`);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const getTransaksi = async (req, res) => {
  try {
    const now = new Date();
    now.setTime(now.getTime() + 8 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

    await Transaksi.updateMany(
      {
        status: "Menunggu",
        $or: [
          { createdAt: { $lt: threeDaysAgo } },
          { tenggatWaktu: { $lt: now } },
        ],
      },
      { $set: { status: "Dibatalkan Sistem" } }
    );

    const transaksi = await Transaksi.find()
      .populate("user", "name profileImg email noTelp address lastLogin")
      .populate({
        path: "penjahit",
        select: "user",
        populate: {
          path: "user",
          select: "name profileImg email noTelp address lastLogin",
        },
      });

    res.json(transaksi);
  } catch (error) {
    console.log(`error in getTransaksi: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransaksiPenjahit = async (req, res) => {
  try {
    const penjahitId = req.params.id;

    const now = new Date();
    now.setTime(now.getTime() + 8 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

    await Transaksi.updateMany(
      {
        status: "Menunggu",
        $or: [
          { createdAt: { $lt: threeDaysAgo } },
          { tenggatWaktu: { $lt: now } },
        ],
      },
      { $set: { status: "Dibatalkan Sistem" } }
    );

    const transaksi = await Transaksi.find({ penjahit: penjahitId })
      .populate("user", "name profileImg email noTelp address lastLogin")
      .populate({
        path: "penjahit",
        select: "user",
        populate: {
          path: "user",
          select: "name profileImg email noTelp address lastLogin",
        },
      });

    res.json(transaksi);
  } catch (error) {
    console.log(`error in getTransaksi: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransaksiPenjahitWaiting = async (req, res) => {
  try {
    const penjahitId = req.params.id;

    const now = new Date();
    now.setTime(now.getTime() + 8 * 60 * 60 * 1000);
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

    await Transaksi.updateMany(
      {
        status: "Menunggu",
        $or: [
          { createdAt: { $lt: threeDaysAgo } },
          { tenggatWaktu: { $lt: now } },
        ],
      },
      { $set: { status: "Dibatalkan Sistem" } }
    );

    const transaksi = await Transaksi.find({
      penjahit: penjahitId,
      status: "Menunggu",
    })
      .populate("user", "name profileImg email noTelp address lastLogin")
      .populate({
        path: "penjahit",
        select: "user",
        populate: {
          path: "user",
          select: "name profileImg email noTelp address lastLogin",
        },
      });

    res.json(transaksi);
  } catch (error) {
    console.log(`error in getTransaksi: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
