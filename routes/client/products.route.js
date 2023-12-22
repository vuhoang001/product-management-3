const express = require("express")
const router = express.Router()
const productsController = require("../../controllers/client/products.controller")

router.get("/", productsController.index)

module.exports = router