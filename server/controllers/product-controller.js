const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  //add new product
  addProduct: async (req, res) => {
    const { name, price, description, category_id, pictures, extras } =
      req.body;

    try {
      //check if the product already exists
      const existingProduct = await prisma.product.findUnique({
        where: { name },
      });

      if (existingProduct)
        return res.status(400).json({ message: "Product already exists" });

      //check if category exists
      const existingCategory = await prisma.category.findUnique({
        where: { id: category_id },
      });

      if (!existingCategory)
        return res.status(400).json({ message: "Category not found" });

      //generaet slug
      const slug = name.toLowerCase().replace(/ /g, "-");

      //   create product
      const product = await prisma.product.create({
        data: {
          name,
          slug,
          price: price.parseFloat(),
          pictures: pictures || {},
          extras: extras || {},
          description,
          categoryId: category_id,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      console.log("Failed to create product", error);
      return res.status(500).json({ message: "Failed to create product" });
    }
  },

  //get all products
  getProducts: async (req, res) => {
    try {
      const products = await prisma.product.findMany();
      if (!products) {
        return res.status(400).json({ message: "Products not found" });
      } else {
        return res.status(200).json({ success: true, data: products });
      }
    } catch (error) {
      console.log("Failed to get products", error);
      return res.status(500).json({ message: "Failed to get products" });
    }
  },
};
