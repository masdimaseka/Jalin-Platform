import uploadStream from "../../middleware/multer.middleware.js";
import Penjahit from "../../models/penjahit.model.js";
import User from "../../models/user.model.js";
import cloudinary from "./../../lib/cloudinary.js";

export const updateStatusPenjahit = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const penjahit = await Penjahit.findById(id);
    if (!penjahit) {
      return res.status(404).json({ message: "Penjahit tidak ditemukan" });
    }

    penjahit.openToWork = status;
    await penjahit.save();

    res.status(200).json({
      message: "Status penjahit berhasil diperbarui",
    });
  } catch (error) {
    console.error(`Error in updateStatusPenjahit: ${error.message}`);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export const updateProfilePenjahit = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      name,
      noTelp,
      address,
      description,
      kategori,
      rentangHarga,
      previousImg,
    } = req.body;

    if (!name || !noTelp || !address || !description || !rentangHarga) {
      return res
        .status(400)
        .json({ message: "Harap isi semua field yang diperlukan" });
    }

    let uploadedProfileImg = previousImg || null;
    let profileImg = req.files;

    const user = await User.findById(userId);

    if (req.files && req.files.length > 0) {
      profileImg = req.files.find((file) => file.fieldname === "profileImg");

      if (user.profileImg) {
        const oldImagePublicId = uploadedProfileImg
          .split("/")
          .pop()
          .split(".")[0];

        await cloudinary.uploader.destroy(
          `jalin/user/profile/${oldImagePublicId}`
        );
      }

      uploadedProfileImg = await uploadStream(
        profileImg.buffer,
        "jalin/user/profile"
      );
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name,
          noTelp,
          address,
          profileImg: uploadedProfileImg,
        },
      },
      { new: true }
    ).select("-password");

    await Penjahit.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          description,
          kategori: Array.isArray(kategori) ? kategori : [kategori],
          rentangHarga,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Profil berhasil diperbarui" });
  } catch (error) {
    console.error("Error in updateProfilePenjahit: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
