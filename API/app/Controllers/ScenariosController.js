'use-strict'

const Scenario = require('../Models/Scenario')
const UserHasScenario = require('../Models/UserHasScenario')
const config = require('../../config')
const Model = require('../Models/Model')

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

  getByIdForUser: (req, res) => {

    const { id } = req.params
    const id_user = req.user.id

    Scenario.getByIdForUser(id, id_user)
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
        if(!result) {
          return res
                  .status(500)
                  .send({ success: false, message: 'No se encontró ningún registro para actualizar.' })
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
  },

  createForUser: (req, res) => {

    const { name, description, brief } = req.body
    const id_user = req.user.id

    if(!name || !description || !brief) {
      return res
              .status(400)
              .send({ success: false, message: 'No se han proporcionado todos los datos.' })
    }

    Model.beginTransaction((error) => {
      if(error) {
        res
          .status(500)
          .send({ success: false, message: 'Ocurrió un error interno.', error: error })
      }

      Scenario.create({ name, description, brief })
        .then((id_scenario) => {
          if(!id_scenario) {

            Model.rollback()

            return res
                    .status(500)
                    .send({ success: false, message: 'No se pudo crear el registro.' })
          }

          UserHasScenario.createRelation(id_user, id_scenario)
            .then((result) => {
              if(!result) {

                Model.rollback()

                return res
                        .status(500)
                        .send({ success: false, message: 'No se pudo crear el registro.' })
              }

              Model.commit()

              res
                .status(200)
                .send({ success: true, message: 'Petición procesada correctamente.' })
            })
            .catch((error) => {

              Model.rollback()
              
              res
                .status(500)
                .send({ success: false, message: 'Ocurrió un error interno.', error: error.sqlMessage })
            })


        })
        .catch((error) => {
          
          Model.rollback()

          res
            .status(500)
            .send({ success: false, message: 'Ocurrió un error interno.', error: error.sqlMessage })

        })
      
    })

  }

}
