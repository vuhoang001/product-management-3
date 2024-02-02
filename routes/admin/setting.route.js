const express = require('express')
const Router = express.Router()
const uploadMiddlewares = require("../../middlewares/admin/uploadCloud.middleware")
const multer = require("multer")
const upload = multer()
const controller = require('../../controllers/admin/setting.controller')


Router.get('/general', controller.index)
Router.post('/general',
    upload.single("thumbnail"),
    uploadMiddlewares.upload,
    controller.add)
module.exports = Router