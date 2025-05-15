import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import penjahitRoutes from "./routes/penjahit.route.js";
import categoryRoutes from "./routes/category.route.js";
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import transaksiRoutes from "./routes/transaksi.route.js";
import pointProductRoutes from "./routes/pointProduct.route.js";
import transaksiPointRoutes from "./routes/transaksiPoint.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://www.jalin.my.id"
        : "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.send("Server is Running!"));

app.get("/api", (req, res) => res.send("API is Running!"));

app.use("/api/auth", authRoutes);
app.use("/api/penjahit", penjahitRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/transaksi", transaksiRoutes);
app.use("/api/point-product", pointProductRoutes);
app.use("/api/transaksi-point", transaksiPointRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
