import bcrypt from "bcryptjs";
import { generateTokenAndSetCookieAdmin } from "../../utils/generateTokenAndSetCookie.js";
import Admin from "../../models/admin.model.js";
import Category from "../../models/category.model.js";
import TransaksiPoint from "../../models/transaksiPoint.model.js";
import Transaksi from "../../models/transaksi.model.js";

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
    ...(process.env.NODE_ENV === "production" && { domain: ".jalin.my.id" }),
  });
  res.json({ message: "Logged out" });
};

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

export const deleteCategoryByAdmin = async (req, res) => {
  try {
    const categories = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(categories);
  } catch (error) {
    console.log(`error in deleteCategory: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransaksiPointByAdmin = async (req, res) => {
  try {
    const transaksi = await TransaksiPoint.find()
      .populate({
        path: "penjahit",
        populate: {
          path: "user",
          select: "name username email noTelp address profileImg",
        },
      })
      .populate("point", "pointName point")
      .sort({ createdAt: -1 });

    res.status(200).json(transaksi);
  } catch (error) {
    console.log(`error in getTransaksiPointByAdmin: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransaksiByAdmin = async (req, res) => {
  try {
    const now = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(now.getDate() - 3);

    await Transaksi.updateMany(
      {
        status: "Menunggu",
        $or: [
          { createdAt: { $lt: threeDaysAgo } },
          { tenggatWaktu: { $lt: now } },
        ],
      },
      { $set: { status: "Dibatalkan Sistem" } }
    );

    const transaksi = await Transaksi.find()
      .populate(
        "user",
        "name username profileImg email noTelp address lastLogin"
      )
      .populate({
        path: "penjahit",
        select: "user",
        populate: {
          path: "user",
          select: "name username profileImg email noTelp address lastLogin",
        },
      });

    res.json(transaksi);
  } catch (error) {
    console.log(`error in getTransaksi: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransaksiByIdByAdmin = async (req, res) => {
  try {
    const transaksi = await Transaksi.findById(req.params.id)
      .populate(
        "user",
        "name username profileImg email noTelp address lastLogin"
      )
      .populate({
        path: "penjahit",
        select: "user",
        populate: {
          path: "user",
          select: "name username profileImg email noTelp address lastLogin",
        },
      });

    res.json(transaksi);
  } catch (error) {
    console.log(`error in getTransaksi: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
