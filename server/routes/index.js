const router = require("express").Router();

const categoryRoute = require("./category-route");
const productRoute = require("./product-route");

router.use("/category", categoryRoute);
router.use("/product", productRoute);

module.exports = router;
