const express = require("express")
const router = express.Router();
const productsController = require("../../controllers/admin/products.controller")

router.get("/", productsController.index)

module.exports = router
