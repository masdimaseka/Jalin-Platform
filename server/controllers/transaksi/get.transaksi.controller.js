import Transaksi from "../../models/transaksi.model.js";

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

export const getTransaksiById = async (req, res) => {
  try {
    const transaksiId = req.params.id;
    const transaksi = await Transaksi.findById(transaksiId)
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
