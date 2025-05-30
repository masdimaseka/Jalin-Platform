import User from "../models/user.model.js";
import Penjahit from "./../models/penjahit.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "./../emails/emailHandlers.js";

export const checkAuth = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log(`error in checkAuth: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const checkAuthPenjahit = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const penjahit = await Penjahit.findOne({ user: req.user._id })
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
      return res.status(404).json({ message: "Penjahit not found" });
    }

    if (
      penjahit.isVerified === "diterima" ||
      penjahit.isVerified === "onreview"
    ) {
      res.json(penjahit);
    } else {
      res.status(401).json({ message: "Unauthorized as penjahit" });
    }
  } catch (error) {
    console.log(`error in checkAuth: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, username, email, password, noTelp, address, isAgreeTerms } =
      req.body;

    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !noTelp ||
      !address ||
      !isAgreeTerms
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingNoTelp = await User.findOne({ noTelp });
    if (existingNoTelp) {
      return res.status(400).json({ message: "noTelp already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      noTelp,
      address,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      isAgreeTerms,
    });
    await user.save();

    try {
      await upsertStreamUser({
        id: user._id.toString(),
        name: user.name,
        image: user.profileImg || "",
      });
      console.log(`Stream user created for ${user.name}`);
    } catch (error) {
      console.log("Error creating Stream user:", error);
    }

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(`error in signup: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email" });
    }

    user.lastLogin = new Date();
    await user.save();

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(`error in login: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    ...(process.env.NODE_ENV === "production" && { domain: ".jalin.my.id" }),
  });
  res.json({ message: "Logged out" });
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {};

export const resetPassword = async (req, res) => {};
