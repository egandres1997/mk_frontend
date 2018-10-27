'use-strict'

const express = require('express')
const routes = express.Router()
const jwt = require('express-jwt')
const config = require('./config')
const LoginController = require('./app/Controllers/LoginController')

const jwtKey = config.jwtKey

routes.post('/login', jwt(jwtKey), LoginController.login)

module.exports = routes
