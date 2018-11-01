'use-strict'

const conn = require('./Model')

class Product {
  static getAllByScenario (id_scenario, id_user) {
    return new Promise((resolve, reject) => {

      const sql = ` \
        SELECT P.* \
        FROM scenario_has_product SHP, user_has_product UHP, products P \
        WHERE SHP.id_scenario = '${id_scenario}' AND UHP.id_user = '${id_user}' AND P.id = SHP.id_product \
      `
      conn.query(sql, (err, rows) => {
        if (err) { return reject(err) }

        if (!rows.length) { return resolve([]) }

        resolve(rows)
      })
    })
  }
}

module.exports = Product
