'use-strict'

const express = require('express')
const routes = express.Router()
const LoginController = require('./app/Controllers/LoginController')

routes.get('/login', LoginController.login)

module.exports = routes
