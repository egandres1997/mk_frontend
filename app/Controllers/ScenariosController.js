'use-strict'

const Scenario = require('../Models/Scenario')
const config = require('../../config')

module.exports = {
  getAll: (req, res, next) => {
    Scenario.getAll()
      .then((scenarios) => {
        
        res.send({})
      })
      .catch((error) => {
        res
          .status(500)
          .send({ success: false, message: "Ocurrió un error interno." })
      })
  }
}
