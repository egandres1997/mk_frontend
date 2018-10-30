'use-strict'

const Scenario = require('../Models/Scenario')
const config = require('../../config')

module.exports = {
  getAll: (req, res) => {
    Scenario.getAll()
      .then((scenarios) => {
        res
          .status(200)
          .send({ success: true, message: 'Petición procesada correctamente.', rows: scenarios })
      })
      .catch((error) => {
        res
          .status(500)
          .send({ success: false, message: 'Ocurrió un error interno.', error: error.sqlMessage })
      })
  },

  getByUser: (req, res) => {

    const { id_user } = req.params

    Scenario.getByUser(id_user)
      .then((scenarios) => {
        res
          .status(200)
          .send({ success: true, message: 'Petición procesada correctamente.', rows: scenarios })
      })
      .catch((error) => {
        res
          .status(500)
          .send({ success: false, message: 'Ocurrió un error interno.', error: error.sqlMessage })
      })
  },

  remove: (req, res) => {
    
    const { id } = req.params

    Scenario.remove(id)
      .then(() => {
        res
          .status(200)
          .send({ success: true, message: 'Petición procesada correctamente.' })
      })
      .catch((error) => {
        res
          .status(500)
          .send({ success: false, message: 'Ocurrió un error interno.', error: error.sqlMessage })
      })

  }
}
