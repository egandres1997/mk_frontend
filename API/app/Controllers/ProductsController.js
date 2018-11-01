'use-strict'

const Product = require('../Models/Product')
const config = require('../../config')

module.exports = {
  getAllByScenario: (req, res, next) => {

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
  }
}
