import Penjahit from "../models/penjahit.model.js";
import User from "../models/user.model.js";
import { encrypting } from "../utils/encryption.js";
import cloudinary from "./../lib/cloudinary.js";

export const registerPenjahit = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      profileImg,
      description,
      dokKTP,
      dokPortofolio,
      rentangHarga,
      kategori,
      isAgreeTerms,
    } = req.body;

    if (
      !profileImg ||
      !description ||
      !dokKTP ||
      !rentangHarga ||
      !kategori ||
      kategori.length === 0 ||
      !isAgreeTerms
    ) {
      return res
        .status(400)
        .json({ message: "Harap isi semua field yang diperlukan" });
    }

    const uploadedProfileImg = await cloudinary.uploader.upload(profileImg, {
      folder: "jalin/user/profile",
    });

    const uploadedKTP = await cloudinary.uploader.upload(dokKTP, {
      folder: "jalin/penjahit/KTP",
    });

    const hashedDokKTP = encrypting(uploadedKTP.secure_url);

    let dokPortofolioUrls = [];
    if (Array.isArray(dokPortofolio) && dokPortofolio.length > 0) {
      dokPortofolioUrls = await Promise.all(
        dokPortofolio.map(async (file) => {
          const upload = await cloudinary.uploader.upload(file, {
            folder: "jalin/penjahit/portofolio",
          });
          return upload.secure_url;
        })
      );
    }

    const penjahit = new Penjahit({
      user: userId,
      description,
      dokKTP: hashedDokKTP,
      dokPortofolio: dokPortofolioUrls,
      rentangHarga,
      kategori: Array.isArray(kategori) ? kategori : [kategori],
      isAgreeTerms,
    });

    await penjahit.save();

    const user = await User.findById(userId).select("-password");
    user.profileImg = uploadedProfileImg.secure_url;

    await user.save();

    res.status(201).json({ message: "Penjahit berhasil didaftarkan" });
  } catch (error) {
    console.error(`Error di registerPenjahit: ${error.message}`);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

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
