const uploadToCloudinary = require('../../helpers/uploadCloudinary')
module.exports.upload = async (req, res, next) => {
    if (req.file) {
        let result = await uploadToCloudinary(req.file.buffer)
        console.log(result)
        req.body[req.file.fieldname] = result
    }
    next();
}

