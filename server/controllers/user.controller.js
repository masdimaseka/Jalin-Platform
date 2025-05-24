import User from "../models/user.model.js";
import cloudinary from "./../lib/cloudinary.js";
import uploadStream from "./../middleware/multer.middleware.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.log(`error in getUsers: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(`error in getUserById: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, noTelp, address, previousImg } = req.body;
    if (!name || !noTelp || !address) {
      return res
        .status(400)
        .json({ message: "Harap isi semua field yang diperlukan" });
    }

    let uploadedProfileImg = previousImg || null;

    let profileImg = req.files;

    const user = await User.findById(req.user._id);

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
      req.user._id,
      { $set: { name, noTelp, address, profileImg: uploadedProfileImg } },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Profil berhasil diperbarui" });
  } catch (error) {
    console.error("Error in updateProfile: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
