import bcrypt from "bcryptjs";
import User from "../../models/user.model.js";

export const getUserByAdmin = async (req, res) => {
  try {
    const user = await User.find({ role: "user" });
    res.status(200).json(user);
  } catch (error) {
    console.log(`error in getUser: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserByIdByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.log(`error in getUser: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUserByIdByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.profileImg) {
      const oldImagePublicId = user.profileImg.split("/").pop().split(".")[0];

      await cloudinary.uploader.destroy(
        `jalin/user/profile/${oldImagePublicId}`
      );
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(`Error in deleteUser: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const changeUserPasswordByAdmin = async (req, res) => {
  try {
    const { username, email, newPassword } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.email !== email) {
      return res.status(400).json({ message: "Email does not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(`Error in changeUserPasswordByAdmin: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
