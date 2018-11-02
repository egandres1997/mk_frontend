'use-strict'

const conn = require('./Model')

class Scenario {
  static getAll () {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM scenarios', (err, rows) => {
        if (err) { return reject(err) }
          
        if (!rows.length) { return resolve(false) }

        return resolve(rows)
      })
    })
  }

  static getByUser(id_user) {
  	return new Promise((resolve, reject) => {

  		const sql = ` \
        SELECT SC.*  \
        FROM user_has_scenario UHS \
        LEFT JOIN scenarios SC ON SC.id = UHS.id_scenario \
        WHERE UHS.id_user = ${id_user} \
      `;

      conn.query(sql, (err, rows) => {
        if (err) { return reject(err) }
          
        if (!rows.length) { return resolve(false) }

        return resolve(rows)
      })
    })
  }

  static remove(id, id_user) {
    return new Promise((resolve, reject) => {

      const sql = ` \
        DELETE \
        FROM scenarios \
        WHERE id = ${id} AND ( \
        SELECT COUNT(*) AS relation \
        FROM user_has_scenario \
        WHERE id_user = ${id_user} AND id_scenario = ${id}) > 0 \
      `;

      conn.query(sql, (err, rows) => {
        if (err) { return reject(err) }

        return resolve(true)
      })
    })
  }

  static getByIdForUser(id, id_user) {
    return new Promise((resolve, reject) => {

      const sql = ` \
        SELECT S.* \
        FROM user_has_scenario UHS, scenarios S \
        WHERE UHS.id_user = ${id_user} AND UHS.id_scenario = ${id} AND UHS.id_scenario = S.id \
      `;

      conn.query(sql, (err, rows) => {
        if (err) { return reject(err) }

        if(!rows.length) { return resolve(false) }

        return resolve(rows[0])
      })
    })
  }

  static update(id, scenario) {
    return new Promise((resolve, reject) => {

      let set = []

      Object.keys(scenario).map((index) => {
        set.push(`${index} = '${scenario[index]}'`)  
      })
  
      const sql = ` \
        UPDATE scenarios SET ${set.join()} WHERE id = ${id} \
      `;

      conn.query(sql, (err, result) => {
        if (err) { return reject(err) }

        if(!result) { return resolve(false) }

        return resolve(true)
      })
    })
  }

  static create(scenario) {
    return new Promise((resolve, reject) => {

      let values = []

      Object.keys(scenario).map((index) => {
        values.push(`'${scenario[index]}'`)  
      })
  
      const sql = ` \
        INSERT INTO scenarios (${Object.keys(scenario).join()}) \
        VALUES (${values.join()}) \
      `;

      conn.query(sql, (err, result) => {
        if (err) { return reject(err) }

        if(!result) { return resolve(false) }

        return resolve(result.insertId)
      })
    })
  }
}

module.exports = Scenario
