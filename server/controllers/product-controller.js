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

    //get product by id
    getProduct: async (req, res) => {
        try {
            const product = await prisma.product.findUnique({
                where: { id: parseInt(req.params.id) },
            });

            if (!product) {
                return res.status(400).json({ message: "Product not found" });
            }

            return res.status(200).json({ success: true, data: product });
        } catch (error) {
            console.log("Failed to get product", error);
            return res.status(500).json({ message: "Failed to get product" });
        }
    },

    //edit product
    updateProduct: async (req, res) => {
        const { id } = req.params
        const { name, price, description, category_id, pictures, extras, visibility } = req.body
        try {
            const product = await prisma.product.findUnique({
                where: { id: parseInt(id) },
            })

            if (!product) {
                return res.status(400).json({ message: "Product not found" });
            }

            //verify the category exists
            const existingCategory = await prisma.category.findUnique({
                where: { id: category_id }
            });

            if (!existingCategory) return res.status(400).json({ message: "Category not found" });

            //update product fields
            const updatedProduct = await prisma.product.update({
                where: { id: parseInt(id) },
                data: {
                    name: name || product.name,
                    price: price || product.price,
                    description: description || product.description,
                    pictures: pictures || product.pictures,
                    extras: extras || product.extras,
                    categoryId: category_id || product.categoryId,
                    visibility: visibility || product.visibility
                }
            });

            return res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: updatedProduct
            })
        } catch (error) {
            console.log("Failed to update product", error);
            return res.status(500).json({ message: "Failed to update product" });
        }
    },

    //delete product
    deleteProduct: async (req, res) => {
        const { id } = req.params
        try {
            const product = await prisma.product.findUnique({
                where: { id: parseInt(id) },
            })

            if (!product) return res.status(400).json({ message: "Product not found" });

            await prisma.product.delete({
                where: { id: parseIint(id) },
            })

            return res.status(200).json({ success: true, message: "Product deleted successfully" })
        } catch (error) {
            console.log("Failed to delete product", error);
            return res.status(500).json({ message: "Failed to delete product" });
        }
    }
};
