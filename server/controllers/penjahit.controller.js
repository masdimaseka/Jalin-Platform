import Penjahit from "../models/penjahit.model.js";
import { decrypting, encrypting } from "../utils/encryption.js";
import cloudinary from "./../lib/cloudinary.js";

export const registerPenjahit = async (req, res) => {
  try {
    const userId = req.user._id;

    const { dokKTP, dokPortofolio, rentangHarga, kategori, isAgreeTerms } =
      req.body;

    if (
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
      dokKTP: hashedDokKTP,
      dokPortofolio: dokPortofolioUrls,
      rentangHarga,
      kategori: Array.isArray(kategori) ? kategori : [kategori],
      isAgreeTerms,
    });

    await penjahit.save();

    res.status(201).json({ message: "Penjahit berhasil didaftarkan" });
  } catch (error) {
    console.error(`Error di registerPenjahit: ${error.message}`);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

export const getPenjahit = async (req, res) => {
  try {
    const penjahit = await Penjahit.find().populate(
      "user",
      "name username email noTelp address lastLogin "
    );

    const decryptedPenjahit = penjahit.map((p) => ({
      ...p._doc,
      dokKTP: encodeURIComponent(decrypting(p.dokKTP)),
      dokPortofolio: p.dokPortofolio.map((url) => encodeURIComponent(url)),
    }));

    res.status(200).json(decryptedPenjahit);
  } catch (error) {
    console.log(`error in getPenjahit: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
