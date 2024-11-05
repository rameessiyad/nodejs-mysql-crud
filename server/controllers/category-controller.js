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
};
