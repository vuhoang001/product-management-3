const express = require("express")
const router = express.Router();


const uploadMiddlewares = require("../../middlewares/admin/uploadCloud.middleware")
const productsController = require("../../controllers/admin/products.controller")
const multer = require("multer")
// const storageMulterHelpers = require("../../helpers/storageMulter.helper")
const validates = require("../../validates/admin/products.validates")
// const storage = storageMulterHelpers();
const upload = multer()


router.get("/", productsController.index)
router.patch("/change-status/:status/:id", productsController.changeStatus)
router.patch("/change-multi", productsController.changeMulti)
router.delete("/delete/:id", productsController.delete)
router.get("/create", productsController.create)
router.post("/create",
    upload.single("thumbnail"),
    validates.createPost,
    uploadMiddlewares.upload,
    productsController.createPost)
router.get("/edit/:id", productsController.edit)
router.patch("/edit/:id", upload.single("thumbnail"), validates.createPost, uploadMiddlewares.upload, productsController.editPatch)
router.get("/detail/:id", productsController.detail)
module.exports = router
