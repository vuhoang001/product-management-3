const express = require('express')
const router = express.Router()

const multer = require("multer")
const upload = multer()

const uploadMiddlewares = require("../../middlewares/admin/uploadCloud.middleware")
const controller = require('../../controllers/admin/products-category.controller.js')

router.get('/', controller.index)

router.get('/create', controller.create)

router.post('/create',
    upload.single("thumbnail"),
    uploadMiddlewares.upload,
    controller.createPort)
module.exports = router

router.get('/edit/:id',
    upload.single("thumbnail"),
    uploadMiddlewares.upload,
    controller.edit
)

router.patch('/change-status/:status/:id', controller.changeStatus)