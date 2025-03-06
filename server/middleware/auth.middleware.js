import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["token"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(`error in protectRoute: middleware, ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const protectRouteAdmin = async (req, res, next) => {
  try {
    const token = req.cookies["token-admin"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const admin = await Admin.findById(decoded.adminId).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not registed" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.log(`error in protectRoute: middleware, ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
