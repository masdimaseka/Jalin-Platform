import uploadStream from "../../middleware/multer.middleware.js";
import Penjahit from "../../models/penjahit.model.js";
import User from "../../models/user.model.js";
import { encrypting } from "../../utils/encryption.js";

export const registerPenjahit = async (req, res) => {
  try {
    const userId = req.user._id;

    const { description, rentangHarga, kategori, isAgreeTerms } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "File tidak ditemukan" });
    }

    const profileImg = req.files.find(
      (file) => file.fieldname === "profileImg"
    );
    const dokKTP = req.files.find((file) => file.fieldname === "dokKTP");
    const dokPortofolio = req.files.filter(
      (file) => file.fieldname === "dokPortofolio"
    );

    if (
      !description ||
      !rentangHarga ||
      !kategori ||
      kategori.length === 0 ||
      !isAgreeTerms
    ) {
      return res
        .status(400)
        .json({ message: "Harap isi semua field yang diperlukan" });
    }

    const uploadedProfileImg = await uploadStream(
      profileImg.buffer,
      "jalin/user/profile"
    );

    const uploadedKTP = await uploadStream(dokKTP.buffer, "jalin/penjahit/KTP");

    const hashedDokKTP = encrypting(uploadedKTP);

    let dokPortofolioUrls = [];
    if (Array.isArray(dokPortofolio) && dokPortofolio.length > 0) {
      dokPortofolioUrls = await Promise.all(
        dokPortofolio.map((file) =>
          uploadStream(file.buffer, "jalin/penjahit/portofolio")
        )
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
