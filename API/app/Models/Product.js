'use-strict'

const conn = require('./Model')

class Product {
  static getAllByScenario (id_scenario, id_user) {
    return new Promise((resolve, reject) => {

      const sql = ` \
        SELECT P.* \
        FROM scenario_has_product SHP, user_has_product UHP, products P \
        WHERE SHP.id_scenario = '${id_scenario}' AND UHP.id_user = '${id_user}' AND P.id = SHP.id_product \
        GROUP BY P.id \
      `

      conn.query(sql, (err, rows) => {
        if (err) { return reject(err) }

        if (!rows.length) { return resolve([]) }

        resolve(rows)
      })
    })
  }

  static remove(id, id_user) {
    
    return new Promise((resolve, reject) => {

      const sql = ` \
        DELETE \
        FROM products \
        WHERE id = ${id} AND ( \
        SELECT COUNT(*) AS relation \
        FROM user_has_product \
        WHERE id_user = ${id_user} AND id_product = ${id}) > 0 \
      `
      conn.query(sql, (err, result) => {
        if (err) { return reject(err) }

        if (!result) { return resolve(false) }

        resolve(true)
      })
    })
  }

  static getByIdForUser(id, id_user) {

    return new Promise((resolve, reject) => {

      const sql = ` \
        SELECT P.* \
        FROM user_has_product UHS, products P  \
        WHERE UHS.id_user = ${id_user} AND UHS.id_product = ${id} AND P.id = UHS.id_product \
      `
      conn.query(sql, (err, rows) => {
        if (err) { return reject(err) }

        if (!rows.length) { return resolve([]) }

        resolve(rows[0])
      })
    })

  }

  static update(id, id_user, product) {

    return new Promise((resolve, reject) => {

      let set = []

      Object.keys(product).map((index) => {
        set.push(`${index} = '${product[index]}'`)  
      })

      const sql = ` \
        UPDATE products P SET ${set} \
        WHERE P.id = ${id} AND ( \
        SELECT COUNT(*) AS relation \
        FROM user_has_product \
        WHERE id_user = ${id_user} AND id_product = P.id) > 0 \
      `

      conn.query(sql, (err, result) => {
        if (err) { return reject(err) }

        if (!result) { return resolve(false) }

        resolve(true)
      })
    })

  }

  static create(id_user, product) {
    return new Promise((resolve, reject) => {

      let values = []

      Object.keys(product).map((index) => {
        values.push(`'${product[index]}'`)  
      })
  
      const sql = ` \
        INSERT INTO products (${Object.keys(product).join()}) \
        VALUES (${values.join()}) \
      `;

      conn.query(sql, (err, result) => {
        if (err) { return reject(err) }

        if(!result) { return resolve(false) }

        return resolve(result.insertId)
      })
    })
  }

  static getImgRouteByProduct(id) {
    return new Promise((resolve, reject) => {

      const sql = ` \
        SELECT img_route FROM products WHERE id = ${id}
      `;

      conn.query(sql, (err, rows) => {
        if (err) { return reject(err) }

        if(!rows.length) { return reject(false) }

        return resolve(rows[0].img_route)
      })
    })
  }
}

module.exports = Product
