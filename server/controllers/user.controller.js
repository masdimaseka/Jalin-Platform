import User from "../models/user.model.js";
import cloudinary from "./../lib/cloudinary.js";

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
    const allowedFields = ["name", "noTelp", "address", "profileImg"];
    const updatedData = {};

    for (const field of allowedFields) {
      if (req.body[field]) updatedData[field] = req.body[field];
    }

    const user = await User.findById(req.user._id);

    if (req.body.profileImg) {
      if (user.profileImg) {
        const oldImagePublicId = user.profileImg.split("/").pop().split(".")[0];

        await cloudinary.uploader.destroy(
          `jalin/user/profile/${oldImagePublicId}`
        );
      }

      const uploadedProfileImg = await cloudinary.uploader.upload(
        req.body.profileImg,
        {
          folder: "jalin/user/profile",
        }
      );
      updatedData.profileImg = uploadedProfileImg.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedData },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    console.error("Error in updateProfile: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
