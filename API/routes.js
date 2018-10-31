'use-strict'

const express = require('express')
const routes = express.Router()
const jwt = require('express-jwt')
const config = require('./config')
const LoginController = require('./app/Controllers/LoginController')
const ScenariosController = require('./app/Controllers/ScenariosController')

const jwtKey = config.jwtKey

// Security Routes
routes.post('/security/login', LoginController.login)

// Scenarios Routes
routes.get('/scenarios/get_all', jwt(jwtKey), ScenariosController.getAll)
routes.get('/scenarios/get_by_user/:id_user', jwt(jwtKey), ScenariosController.getByUser)
routes.get('/scenarios/remove/:id', jwt(jwtKey), ScenariosController.remove)
routes.get('/scenarios/get_by_id/:id', jwt(jwtKey), ScenariosController.getById)
routes.post('/scenarios/update', jwt(jwtKey), ScenariosController.update)
// routes.post('/login', jwt(jwtKey), LoginController.login)

module.exports = routes
