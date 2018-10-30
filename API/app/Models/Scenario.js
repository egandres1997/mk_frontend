'use-strict'

const conn = require('./Model')

class Scenario {
  static getAll () {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM scenarios', (err, rows) => {
        if (err) { return reject(err) }
          
        if (!rows.length) { resolve(false) }

        resolve(rows)
      })
    })
  }

  static getByUser(id_user) {
  	return new Promise((resolve, reject) => {

  		const sql = ' \
        SELECT SC.*  \
        FROM user_has_scenario UHS \
        LEFT JOIN scenarios SC ON SC.id = UHS.id_scenario \
        WHERE UHS.id_user = '+id_user+' \
      ';

      conn.query(sql, (err, rows) => {
        if (err) { return reject(err) }
          
        if (!rows.length) { resolve(false) }

        resolve(rows)
      })
    })
  }
}

module.exports = Scenario
