'use-strict'

const conn = require('./Model')

class ScenarioHasProduct {
  static createRelation(id_scenario, id_product) {
    return new Promise((resolve, reject) => {

      const sql = ` \
        INSERT INTO scenario_has_product (id_scenario, id_product) \
        VALUES ('${id_scenario}', '${id_product}') \
      `

      conn.query(sql, (err, result) => {
        if (err) { return reject(err) }

        if (!result) { return resolve(false) }

        resolve(true)
      })
    })
  }
}

module.exports = ScenarioHasProduct
