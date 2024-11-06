const express = require("express");
const {
  addProduct,
  getProducts,
} = require("../controllers/product-controller");

const router = express.Router();

router.post("/", addProduct);
router.get("/", getProducts);

module.exports = router;
