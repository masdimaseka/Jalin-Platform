import { sendGetTransactionEmail } from "../../emails/emailHandlers.js";
import uploadStream from "../../middleware/multer.middleware.js";
import Transaksi from "../../models/transaksi.model.js";
import User from "../../models/user.model.js";
import Penjahit from ".././../models/penjahit.model.js";

export const createTransaksi = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      judul,
      deskripsi,
      tenggatWaktu,
      prosesPengerjaan,
      catatan,
      alamat,
    } = req.body;

    let uploadedImgUrls = [];

    if (Array.isArray(req.files) && req.files.length > 0) {
      uploadedImgUrls = await Promise.all(
        req.files.map((file) => uploadStream(file.buffer, "jalin/transaksi"))
      );
    }

    const transaksiBaru = new Transaksi({
      user: userId,
      judul,
      deskripsi,
      image: uploadedImgUrls,
      tenggatWaktu,
      pengerjaan: prosesPengerjaan,
      catatan,
      alamat,
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

    const {
      judul,
      deskripsi,
      tenggatWaktu,
      prosesPengerjaan,
      catatan,
      alamat,
    } = req.body;

    let uploadedImgUrls = [];

    if (Array.isArray(req.files) && req.files.length > 0) {
      uploadedImgUrls = await Promise.all(
        req.files.map((file) => uploadStream(file.buffer, "jalin/transaksi"))
      );
    }

    const transaksi = new Transaksi({
      user: userId,
      penjahit: penjahitId,
      judul,
      deskripsi,
      image: uploadedImgUrls,
      tenggatWaktu: tenggatWaktu ? new Date(tenggatWaktu) : null,
      pengerjaan: prosesPengerjaan,
      catatan,
      alamat,
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
    console.error(`Error di createTransaksiToPenjahit: ${error.message}`);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
