const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  //create a new category
  createCategory: async (req, res) => {
    const { name } = req.body;

    //check if category already exists
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory)
      return res.status(400).json({ message: "Category already exists" });

    //create a new category
    const category = await prisma.category.create({
      data: { name: name },
    });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  },

  //get all categories
  getCategories: async (req, res) => {
    const categories = await prisma.category.findMany();
    return res.status(200).json({ success: true, data: categories });
  },

  //get by id
  getCategory: async (req, res) => {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ success: true, data: category });
  },

  //update category
  updateCategory: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) }
    })

    if (!existingCategory) return res.status(400).json({ message: "Category not found" });

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name },
    })

    return res.status(200).json({ message: "Category updated successfully", data: updatedCategory })
  },

  //delete category
  deleteCategory: async (req, res) => {
    const { id } = req.params;
    const category = await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ success: true, message: "Category deleted" });
  },
};
