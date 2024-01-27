const user = require('../../model/user.model')
const userModel = require('../../model/user.model')
const forgetPasswordModel = require('../../model/forget-password.model')
const ramdomNumber = require('../../helpers/generateRamdomString.helper')
const md5 = require('md5')
// [GET] user/register 
module.exports.register = (req, res) => {
    res.render('client/pages/user/register.pug')
}
// [POST] user/register
module.exports.registerPost = async (req, res) => {
    const existedEmail = await userModel.findOne(
        {
            email: req.body.email
        }
    )
    if (existedEmail) {
        res.redirect('back')
        return
    }
    req.body.password = md5(req.body.password)
    const user = new userModel(req.body)
    await user.save()
    res.redirect('/products')
}

// [GET] user/login 
module.exports.login = (req, res) => {
    res.render('client/pages/user/login.pug', {
        pageTitle: "Login"
    })
}

// [POST] user/login 
module.exports.loginPost = async (req, res) => {
    const fullName = req.body.fullName
    const password = req.body.password
    const records = await userModel.findOne(
        {
            fullName: fullName
        }
    )

    if (!records) {
        res.redirect('back')
        return
    }

    if (records.status == 'inactive') {
        res.redirect('back')
        return
    }

    if (md5(req.body.password) !== records.password) {
        res.redirect('back')
        return
    }

    res.cookie('tokenUser', records.tokenUser)
    res.redirect('/products')
}

// [POST] user/log-out
module.exports.logOut = (req, res) => {
    res.clearCookie('tokenUser')
    res.redirect('/home')
}

// [GET] user/password/forget
module.exports.forget = (req, res) => {
    res.render('client/pages/user/forget.pug')
}


// [POST] user/password/forget 
module.exports.forgetPost = async (req, res) => {
    const email = req.body.email

    const record = await userModel.findOne(
        {
            email: email
        }
    )

    if (!record) {
        res.redirect('back')
        return
    }

    const forgetObject = (
        {
            email: email,
            otp: ramdomNumber.ramdomNumber(8),
            expireAt: Date.now()
        }
    )

    const forgetPassword = new forgetPasswordModel(forgetObject)
    await forgetPassword.save()

    res.redirect(`/user/password/otp?email=${email}`)
}


// [GET] /user/password/otp 
module.exports.otp = (req, res) => {
    const email = req.query.email
    res.render('client/pages/user/otp.pug', {
        email: email
    })
}


// [POST] /user/password/otp 
module.exports.otpPost = async (req, res) => {
    const otp = req.body.otp
    const email = req.body.email

    const result = await forgetPasswordModel.findOne({
        email: email,
        otp: otp
    })

    if (!result) {
        res.redirect('back')
        return
    } else {
        res.redirect('/products')
    }
}