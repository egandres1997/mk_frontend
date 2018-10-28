'use-strict'

const conn = require('./Model')

class Scenario {
  static getAll () {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM scenarios', async (err, rows) => {
        if (err)
          return reject(err)

        await rows

        if(!rows.length)
          resolve(false)

        resolve(rows)
      })
    })
  }
}

module.exports = Scenario
