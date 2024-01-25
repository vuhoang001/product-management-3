const express = require("express")
const router = express.Router()
const controller = require('../../controllers/client/cart.controller')

router.post('/add/:product_id', controller.index)
router.get('/', controller.cart)
router.get('/delete/:productID', controller.delete)
router.get('/:productID/:quantity', controller.changeQuantity)
module.exports = router