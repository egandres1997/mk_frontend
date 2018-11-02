'use-strict'

const Product = require('../Models/Product')
const ScenarioHasProduct = require('../Models/ScenarioHasProduct')
const UserHasProduct = require('../Models/UserHasProduct')
const Model = require('../Models/Model')
const config = require('../../config')
const fs = require('fs')
const moment = require('moment')
const path = require('path')

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
    let { img_route } = req.body
    const id_user = req.user.id

    if(!id || !name || !price || !earnings || !solds) {
      return res
              .status(400)
              .send({ success: false, message: 'No se han proporcionado todos los datos.' })
    }

    if(img_route != 'undefined') {

      const buff = new Buffer(img_route, 'base64').toString('ascii');
      const img = buff.split(',')[1];

      const img_name = `product_${id_user}_${moment().unix()}.jpg`

      img_route = `${path.dirname(require.main.filename)}/files/${img_name}`.replace(/\\/g,"/");

      fs.writeFile(img_route, Buffer(img, 'base64'), function(err) {
        if(err) {
          return res
                  .status(500)
                  .send({ success: false, message: 'Ocurrió un error interno (5).', error: error })
        }

        Product.update(id, id_user, { name, price, earnings, solds, img_route: img_name })
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
        
      });
    } else {

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
    }



  },

  createForUserAndScenario: (req, res) => {
    
    const { id_scenario, name, price, earnings, solds } = req.body
    let { img_route } = req.body
    const id_user = req.user.id

    const buff = new Buffer(img_route, 'base64').toString('ascii');
    const img = buff.split(',')[1];

    if(!id_scenario || !name || !price || !earnings || !solds || !img_route) {
      return res
              .status(400)
              .send({ success: false, message: 'No se han proporcionado todos los datos.' })
    }

    const img_name = `product_${id_user}_${moment().unix()}.jpg`

    img_route = `${path.dirname(require.main.filename)}/files/${img_name}`.replace(/\\/g,"/");

    fs.writeFile(img_route, Buffer(img, 'base64'), function(err) {
      if(err) {
        return res
                .status(500)
                .send({ success: false, message: 'Ocurrió un error interno (5).', error: error })
      }

      Model.beginTransaction((error) => {
        if(error) {
          res
            .status(500)
            .send({ success: false, message: 'Ocurrió un error interno (1).', error: error })
        }

        Product.create(id_user, { name, price, earnings, solds, img_route: img_name })
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
    });
  },

  getImageByProduct(req, res) {

    const { id_product } = req.params

    if(!id_product) {
      return res
              .status(400)
              .send({ success: false, message: 'No se envió el id del producto.' })
    }

    Product.getImgRouteByProduct(id_product)
      .then((img_name) => {
        res.sendFile(`${path.dirname(require.main.filename)}/files/${img_name}`);
      })
      .catch(error => {
        res
          .status(500)
          .send({ success: false, message: 'Ocurrió un error interno (1).' })
      })
  }
}
