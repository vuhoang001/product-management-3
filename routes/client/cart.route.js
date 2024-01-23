const express = require("express")
const router = express.Router()
const controller = require('../../controllers/client/cart.controller')

router.post('/add/:product_id', controller.index)
router.get('/', controller.cart)

module.exports = router