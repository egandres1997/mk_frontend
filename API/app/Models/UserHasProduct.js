'use-strict'

const conn = require('./Model')

class UserHasProduct {
  static createRelation(id_user, id_product) {
    return new Promise((resolve, reject) => {

      const sql = ` \
        INSERT INTO user_has_product (id_user, id_product) \
        VALUES ('${id_user}', '${id_product}') \
      `
      conn.query(sql, (err, result) => {
        if (err) { return reject(err) }

        if (!result) { return resolve(false) }

        resolve(true)
      })
    })
  }
}

module.exports = UserHasProduct
