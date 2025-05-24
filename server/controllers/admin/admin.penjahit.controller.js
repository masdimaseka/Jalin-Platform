import cloudinary from "../../lib/cloudinary.js";
import Penjahit from "../../models/penjahit.model.js";
import User from "../../models/user.model.js";
import { decrypting } from "../../utils/encryption.js";

export const getPenjahitByAdmin = async (req, res) => {
  try {
    const penjahit = await Penjahit.find()
      .populate(
        "user",
        "name username email noTelp address lastLogin profileImg"
      )
      .populate({
        path: "kategori",
        select: "name",
      });

    const decryptedPenjahit = penjahit.map((p) => ({
      ...p._doc,
      dokKTP: decrypting(p.dokKTP),
    }));

    res.status(200).json(decryptedPenjahit);
  } catch (error) {
    console.log(`error in getPenjahit: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPenjahitByIdByAdmin = async (req, res) => {
  try {
    const penjahit = await Penjahit.findById(req.params.id)
      .populate(
        "user",
        "name username email noTelp address lastLogin profileImg"
      )
      .populate({
        path: "kategori",
        select: "name",
      });

    if (!penjahit) {
      return res.status(404).json({ message: "Penjahit not found" });
    }

    const penjahitObj = penjahit.toObject();

    const decryptedPenjahit = {
      ...penjahitObj,
      dokKTP: decrypting(penjahitObj.dokKTP),
    };

    res.status(200).json(decryptedPenjahit);
  } catch (error) {
    console.log(`error in getPenjahitByIdByAdmin: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyPenjahit = async (req, res) => {
  try {
    const { id } = req.params;

    const penjahit = await Penjahit.findByIdAndUpdate(
      id,
      { isVerified: "diterima" },
      { new: true }
    );

    if (!penjahit) {
      return res.status(404).json({ message: "Penjahit tidak ditemukan" });
    }

    await penjahit.save();

    const userId = penjahit.user._id;
    await User.findByIdAndUpdate(
      userId,
      { $set: { role: "penjahit" } },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "Penjahit berhasil diverifikasi", penjahit });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

export const setPenjahitPremium = async (req, res) => {
  try {
    const { id } = req.params;
    const premiumPenjahit = await Penjahit.findByIdAndUpdate(
      id,
      { isPremium: true },
      { new: true }
    );

    res.json(premiumPenjahit);
  } catch (error) {
    console.log(`error in setPenjahitPremium: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePenjahitByIdByAdmin = async (req, res) => {
  try {
    const penjahit = await Penjahit.findById(req.params.id);
    if (!penjahit) {
      return res.status(404).json({ message: "Penjahit not found" });
    }

    const penjahitObj = penjahit.toObject();

    const decryptedPenjahit = {
      ...penjahitObj,
      dokKTP: decrypting(penjahitObj.dokKTP),
      dokPortofolio: penjahitObj.dokPortofolio?.map((url) =>
        decodeURIComponent(url)
      ),
    };

    if (decryptedPenjahit.dokKTP) {
      const ktpPublicId = decryptedPenjahit.dokKTP
        .split("/")
        .pop()
        .split(".")[0];
      await cloudinary.uploader.destroy(`jalin/penjahit/KTP/${ktpPublicId}`);
    }

    if (
      decryptedPenjahit.dokPortofolio &&
      decryptedPenjahit.dokPortofolio.length > 0
    ) {
      for (const portofolioUrl of decryptedPenjahit.dokPortofolio) {
        const portofolioPublicId = portofolioUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(
          `jalin/penjahit/Portofolio/${portofolioPublicId}`
        );
      }
    }

    const user = await User.findById(penjahit.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "user";
    await user.save();

    await Penjahit.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Penjahit deleted successfully" });
  } catch (error) {
    console.error(`Error in deletePenjahitByIdByAdmin: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
