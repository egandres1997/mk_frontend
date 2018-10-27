'use-strict'

const env = require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,
  jwtKey: {
    secret: process.env.JWT_KEY
  }
}