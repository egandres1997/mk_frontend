'use-strict'

const Product = require('../Models/Product')
const ScenarioHasProduct = require('../Models/ScenarioHasProduct')
const UserHasProduct = require('../Models/UserHasProduct')
const Model = require('../Models/Model')
const config = require('../../config')

module.exports = {
  getAllByScenario: (req, res) => {

    const { id } = req.params
    const id_user = req.user.id

    Product.getAllByScenario(id, id_user)
      .then((products) => {
        res
          .status(200)
          .send({ success: true, message: 'Petición procesada correctamente.', rows: products })
      })
      .catch((error) => {
        res
          .status(500)
          .send({ success: false, message: 'Ocurrió un error interno.', error: error.sqlMessage })
      })
  },

  remove: (req, res) => {

    const { id } = req.params
    const id_user = req.user.id

    Product.remove(id, id_user)
      .then((products) => {
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

    Product.getByIdForUser(id, id_user)
      .then((product) => {
        res
          .status(200)
          .send({ success: true, message: 'Petición procesada correctamente.', row: product })
      })
      .catch((error) => {
        res
          .status(500)
          .send({ success: false, message: 'Ocurrió un error interno.', error: error.sqlMessage })
      })

  },

  update: (req, res) => {

    const { id, name, price, earnings, solds } = req.body
    const id_user = req.user.id

    Product.update(id, id_user, { name, price, earnings, solds })
      .then((result) => {
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

  createForUserAndScenario: (req, res) => {
    
    const { id_scenario, name, price, earnings, solds } = req.body
    const id_user = req.user.id    

    if(!id_scenario || !name || !price || !earnings || !solds) {
      return res
              .status(400)
              .send({ success: false, message: 'No se han proporcionado todos los datos.' })
    }

    Model.beginTransaction((error) => {
      if(error) {
        res
          .status(500)
          .send({ success: false, message: 'Ocurrió un error interno (1).', error: error })
      }

      Product.create(id_user, { name, price, earnings, solds })
        .then(id_product => {
          Promise.all([
            UserHasProduct.createRelation(id_user, id_product),
            ScenarioHasProduct.createRelation(id_scenario, id_product)
          ])
          .then(result => {

            res
              .status(200)
              .send({ success: true, message: 'Petición procesada correctamente.' })

            Model.commit()

          })
          .catch(error => {

            Model.rollback()

            res
              .status(500)
              .send({ success: false, message: 'Ocurrió un error interno (4).', error: error.sqlMessage })
          })  
        })
        .catch(error => {

          Model.rollback()

          res
            .status(500)
            .send({ success: false, message: 'Ocurrió un error interno (4).', error: error.sqlMessage })
        })
    })

  }
}
