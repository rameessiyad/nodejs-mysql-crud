const router = require("express").Router();

const categoryRoute = require("./category-route");

router.use("/category", categoryRoute);

module.exports = router;
