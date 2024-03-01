const express = require('express')
const Router = express.Router()


const controller = require('../../controllers/client/users.controller')

Router.get('/not-friend', controller.notFriend)
Router.get('/request', controller.request)
Router.get('/accept', controller.requestFriend)
Router.get('/friend', controller.friend)

module.exports = Router
