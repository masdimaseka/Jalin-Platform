import bcrypt from "bcryptjs";
import { generateTokenAndSetCookieAdmin } from "../utils/generateTokenAndSetCookie.js";
import Penjahit from "../models/penjahit.model.js";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";
import { decrypting } from "../utils/encryption.js";

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
  res.clearCookie("token-admin", {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    domain: ".jalin.my.id",
  });
  res.json({ message: "Logged out" });
};

export const getPenjahitByAdmin = async (req, res) => {
  try {
    const penjahit = await Penjahit.find().populate(
      "user",
      "name username email noTelp address lastLogin profileImg"
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

export const getUserByAdmin = async (req, res) => {
  try {
    const user = await User.find({ role: "user" });
    res.status(200).json(user);
  } catch (error) {
    console.log(`error in getUser: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

import Category from "./../models/category.model.js";

export const getCategoryByAdmin = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(`error in getCategory: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerCategoryByAdmin = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const category = new Category({ name });
    await category.save();

    res.status(200).json({ message: "Category registered successfully" });
  } catch (error) {
    console.log(`error in registerCategory: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
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
