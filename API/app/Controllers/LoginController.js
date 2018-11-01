'use-strict'

const User = require('../Models/User')
const bcrypt = require('bcrypt')
const config = require('../../config')
const jwt = require('jsonwebtoken')

module.exports = {
  login: (req, res, next) => {
    const { email, password } = req.body
  
    if (!email || !password) {
      return res
        .status(401)
        .send({ success: false, message: 'Datos incompletos para procesar la solicitud.' })
    }

    User.getByEmail (email)
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ success: false, message: 'No se encontró este usuario.' })
        }

        const passwordVerify = bcrypt.compareSync(password, user.password)

        if (!passwordVerify) {
          return res
            .status(401)
            .send({ success: false, message: 'Contraseña incorrecta.' })
        }

        jwt.sign({ id: user.id, email: user.email, username: user.username }, config.jwtKey.secret, function (error, token) {
          if (error) {
            return res
              .status(500)
              .send({ success: false, message: 'Ocurrió un error al firmar sus datos.' })
          }

          return res
            .status(200)
            .send({ success: true, message: 'Ingreso Correcto.', user: { id: user.id, token } })
        })
      })
      .catch((error) => {
        return res
          .status(500)
          .send({ success: false, message: 'Ocurrió un error interno', error: error.sqlMessage })
      })
  }
}
