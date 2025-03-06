import Category from "./../models/category.model.js";

export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(`error in getCategory: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const registerCategory = async (req, res) => {
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
