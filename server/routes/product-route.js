const express = require("express");
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product-controller");

const router = express.Router();

router.post("/", addProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
