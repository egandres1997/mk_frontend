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
  },

  getById: (req, res) => {

    const { id } = req.params

    Scenario.getById(id)
      .then((scenario) => {
        res
          .status(200)
          .send({ success: true, message: 'Petición procesada correctamente.', row: scenario })
      })
      .catch((error) => {
        res
          .status(500)
          .send({ success: false, message: 'Ocurrió un error interno.', error: error.sqlMessage })
      })
  },

  update: (req, res) => {

    const { id, name, description, brief } = req.body

    if(!id || !name || !description || !brief) {
      return res
              .status(400)
              .send({ success: false, message: 'No se han proporcionado todos los datos.' })
    }

    Scenario.update(id, { name, description, brief })
      .then((result) => {
        console.log(result)
        if(!result) {
          return res
                  .status(500)
                  .send({ success: true, message: 'No se encontró ningún registro para actualizar.' })
        }

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
