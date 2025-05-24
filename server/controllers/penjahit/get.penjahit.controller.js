import Penjahit from "../../models/penjahit.model.js";

export const getPenjahit = async (req, res) => {
  try {
    const penjahit = await Penjahit.find()
      .populate(
        "user",
        "name username email noTelp address lastLogin profileImg"
      )
      .populate({
        path: "kategori",
        select: "name",
      })
      .select("-dokKTP");

    const decryptedPenjahit = penjahit.map((p) => ({
      ...p._doc,
      dokPortofolio: p.dokPortofolio.map((url) => encodeURIComponent(url)),
    }));

    res.status(200).json(decryptedPenjahit);
  } catch (error) {
    console.log(`error in getPenjahit: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPenjahitById = async (req, res) => {
  try {
    const { id } = req.params;

    const penjahit = await Penjahit.findById(id)
      .populate(
        "user",
        "name username email noTelp address lastLogin profileImg"
      )
      .populate({
        path: "kategori",
        select: "name",
      })
      .select("-dokKTP");

    if (!penjahit) {
      return res.status(404).json({ message: "Penjahit tidak ditemukan" });
    }

    const decryptedPenjahit = {
      ...penjahit._doc,
      dokPortofolio: penjahit.dokPortofolio?.map((url) =>
        encodeURIComponent(url)
      ),
    };

    res.status(200).json(decryptedPenjahit);
  } catch (error) {
    console.error(`Error in getPenjahitById: ${error.message}`);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const getPenjahitByIdUser = async (req, res) => {
  try {
    const { id } = req.params;

    const penjahit = await Penjahit.findOne({ user: id })
      .populate(
        "user",
        "name username email noTelp address lastLogin profileImg"
      )
      .populate({
        path: "kategori",
        select: "name",
      })
      .select("-dokKTP");

    if (!penjahit) {
      return res.status(404).json({ message: "Penjahit tidak ditemukan" });
    }

    const decryptedPenjahit = {
      ...penjahit._doc,
      dokPortofolio: penjahit.dokPortofolio?.map((url) =>
        encodeURIComponent(url)
      ),
    };

    res.status(200).json(decryptedPenjahit);
  } catch (error) {
    console.error(`Error in getPenjahitById: ${error.message}`);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const getPenjahitPremium = async (req, res) => {
  try {
    const penjahit = await Penjahit.find({ isPremium: true })
      .populate(
        "user",
        "name username email noTelp address lastLogin profileImg"
      )
      .populate({
        path: "kategori",
        select: "name",
      })
      .select("-dokKTP");

    const decryptedPenjahit = penjahit.map((p) => ({
      ...p._doc,
      dokPortofolio: p.dokPortofolio.map((url) => encodeURIComponent(url)),
    }));

    res.status(200).json(decryptedPenjahit);
  } catch (error) {
    console.log(`error in getPenjahit: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
