import uploadStream from "../../middleware/multer.middleware.js";
import Transaksi from "../../models/transaksi.model.js";
import Penjahit from "./../../models/penjahit.model.js";

export const acceptTransaksiPenjahit = async (req, res) => {
  try {
    const transaksiId = req.params.id;

    const penjahitId = req.body.penjahitId;

    const penjahit = await Penjahit.findByIdAndUpdate(
      penjahitId,
      { $inc: { point: -2000 } },
      { new: true }
    );
    await penjahit.save();

    const transaksi = await Transaksi.findByIdAndUpdate(
      transaksiId,
      { status: "Diproses", penjahit: penjahitId },
      { new: true }
    );

    res.json(transaksi);
  } catch (error) {
    console.log(`error in getTransaksi: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const rejectTransaksiPenjahit = async (req, res) => {
  try {
    const transaksiId = req.params.id;

    const transaksi = await Transaksi.findByIdAndUpdate(
      transaksiId,
      { status: "Ditolak" },
      { new: true }
    );

    res.json(transaksi);
  } catch (error) {
    console.log(`error in getTransaksi: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const finishTransaksiPenjahit = async (req, res) => {
  const transaksiId = req.params.id;

  let uploadedImgUrls = [];

  if (Array.isArray(req.files) && req.files.length > 0) {
    uploadedImgUrls = await Promise.all(
      req.files.map((file) =>
        uploadStream(file.buffer, "jalin/transaksi-selesai")
      )
    );
  }

  try {
    const transaksi = await Transaksi.findByIdAndUpdate(
      transaksiId,
      { status: "Selesai", imageSelesai: uploadedImgUrls },
      { new: true }
    );
    res.json(transaksi);
  } catch (error) {
    console.error(`Error di createPembatalanTransaksi: ${error.message}`);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const reviewTransaksiPenjahit = async (req, res) => {
  const transaksiId = req.params.id;
  const { rating, review, userId } = req.body;

  const newReview = {
    rating,
    content: review,
    user: userId,
  };

  try {
    const transaksi = await Transaksi.findByIdAndUpdate(
      transaksiId,
      { $push: { review: newReview } },
      { new: true }
    );
    res.json(transaksi);
  } catch (error) {
    console.error(`Error di ReviewTransaksiPenjahit: ${error.message}`);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
