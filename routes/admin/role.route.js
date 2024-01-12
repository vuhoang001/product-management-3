const express = require('express')
const router = express.Router()

const controller = require('../../controllers/admin/role.controller.js')

router.get('/', controller.index)
router.get('/create', controller.create)
router.post('/createPost', controller.createPost)

module.exports = router