'use-strict'

const express = require('express')
const routes = express.Router()
const jwt = require('express-jwt')
const config = require('./config')
const LoginController = require('./app/Controllers/LoginController')
const ScenariosController = require('./app/Controllers/ScenariosController')
const ProductsController = require('./app/Controllers/ProductsController')

const jwtKey = config.jwtKey

// Security Routes
routes.post('/security/login', LoginController.login)

// Scenarios Routes
routes.get('/scenarios/get_all', jwt(jwtKey), ScenariosController.getAllByUser)
routes.get('/scenarios/remove/:id', jwt(jwtKey), ScenariosController.remove)
routes.get('/scenarios/get_by_id_for_user/:id', jwt(jwtKey), ScenariosController.getByIdForUser)
routes.post('/scenarios/update', jwt(jwtKey), ScenariosController.update)
routes.post('/scenarios/create_for_user', jwt(jwtKey), ScenariosController.createForUser)

// Products Routes
routes.get('/products/get_all_by_scenario/:id', jwt(jwtKey), ProductsController.getAllByScenario)
routes.get('/products/remove/:id', jwt(jwtKey), ProductsController.remove)
routes.get('/products/get_by_id_for_user/:id', jwt(jwtKey), ProductsController.getByIdForUser)
routes.post('/products/update', jwt(jwtKey), ProductsController.update)
routes.post('/products/create_for_user_and_scenario', jwt(jwtKey), ProductsController.createForUserAndScenario)

routes.get('/products/image/:id_product', ProductsController.getImageByProduct)

module.exports = routes
