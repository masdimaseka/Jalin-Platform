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
