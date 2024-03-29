const express = require("express")
const router = express.Router()
const productsController = require("../../controllers/client/products.controller")

router.get("/", productsController.index)
router.get("/detail/:slug", productsController.detail)
router.get("/:categoryProduct", productsController.category)
module.exports = router