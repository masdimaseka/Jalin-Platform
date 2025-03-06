import bcrypt from "bcryptjs";
import { generateTokenAndSetCookieAdmin } from "../utils/generateTokenAndSetCookie.js";
import Penjahit from "../models/penjahit.model.js";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";

export const checkAuthAdmin = async (req, res) => {
  try {
    res.json(req.admin);
  } catch (error) {
    console.log(`error in checkAuth: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(400).json({ message: "Username Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password Invalid credentials" });
    }

    generateTokenAndSetCookieAdmin(res, admin._id);

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(`error in login: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutAdmin = async (req, res) => {
  res.clearCookie("token-admin");
  res.json({ message: "Logged out" });
};

export const getPenjahit = async (req, res) => {
  try {
    const penjahit = await Penjahit.find().populate(
      "user",
      "name username email noTelp address lastLogin "
    );

    res.status(200).json(penjahit);
  } catch (error) {
    console.log(`error in getPenjahit: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyPenjahit = async (req, res) => {
  try {
    const { id } = req.params;

    const penjahit = await Penjahit.findByIdAndUpdate(
      id,
      { isVerified: true },
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

export const getUser = async (req, res) => {
  try {
    const user = await User.find({ role: "user" });
    res.status(200).json(user);
  } catch (error) {
    console.log(`error in getUser: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
