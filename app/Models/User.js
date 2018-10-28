'use-strict'

const conn = require('./Model')

class User {
  static getAll () {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM users', async (err, rows) => {
        if (err) 
          return reject(err)

        await rows

        if(!rows.length)
          resolve(false)

        resolve(rows)
      })
    })
  }
  static getByEmail (email) {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM users WHERE email = '" + email + "'", async (err, rows) => {
        if (err) 
          return reject(err)

        await rows

        if(!rows.length)
          resolve(false)

        resolve(rows[0])
      })
    })
  }
}

module.exports = User
