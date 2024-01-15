const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/accounts.controller")

const uploadMiddlewares = require("../../middlewares/admin/uploadCloud.middleware")
const multer = require("multer")
const upload = multer()

router.get("/", controller.index)

router.get("/create", controller.create)

router.post("/create",
    upload.single("avatar"),
    uploadMiddlewares.upload,
    controller.createPost
)

router.get("/edit/:id", controller.edit)

module.exports = router