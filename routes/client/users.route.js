const express = require('express')
const Router = express.Router()


const controller = require('../../controllers/client/users.controller')

Router.get('/not-friend', controller.notFriend)

module.exports = Router
