const express = require("express");
const router = express.Router();


const categoryRoute = require("./categories.js");
const productRoute = require("./products.js");


router.use("/categories", categoryRoute);

router.use("/products", productRoute); 




module.exports = router;