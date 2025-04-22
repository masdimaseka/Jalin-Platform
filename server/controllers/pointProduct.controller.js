import PointProduct from "../models/pointProduct.model.js";

export const getPointProduct = async (req, res) => {
  try {
    const PointProducts = await PointProduct.find();
    res.status(200).json(PointProducts);
  } catch (error) {
    console.log(`error in getPointProduct: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPointProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const pointProducts = await PointProduct.findById(id);
    res.status(200).json(pointProducts);
  } catch (error) {
    console.log(`error in getPointProduct: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerPointProduct = async (req, res) => {
  try {
    const { pointName, point, price } = req.body;

    if (!pointName || !point || !price) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const pointProduct = new PointProduct({ pointName, point, price });
    await pointProduct.save();

    res.status(201).json({ message: "point product registered successfully" });
  } catch (error) {
    console.log(`error in registerPointProduct: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
