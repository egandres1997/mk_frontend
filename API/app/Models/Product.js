'use-strict'

const conn = require('./Model')

class Product {
  static getAll () {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM products', (err, rows) => {
        if (err) { return reject(err) }

        if (!rows.length) { resolve(false) }

        resolve(rows)
      })
    })
  }
}

module.exports = Product
