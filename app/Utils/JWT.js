'use-strict'

const jwt = require('jsonwebtoken')

module.exports = {
  sign: (payload, secret, callback) => {
    jwt.sign(payload, secret, callback)
  },

  verify: (token, secret, callback) => {
    jwt.verify(token, secret, callback)
  }
}