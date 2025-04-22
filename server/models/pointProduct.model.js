import mongoose from "mongoose";

const pointProductSchema = new mongoose.Schema(
  {
    pointName: {
      type: String,
      required: true,
    },
    point: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const PointProduct = mongoose.model("PointProduct", pointProductSchema);
export default PointProduct;
