'use-strict'

const conn = require('./Model')

class UserHasScenario {
  static createRelation(id_user, id_scenario) {
    return new Promise((resolve, reject) => {

      const sql = ` \
        INSERT INTO user_has_scenario (id_user, id_scenario) \
        VALUES ('${id_user}', '${id_scenario}') \
      `

      conn.query(sql, (err, result) => {
        if (err) { return reject(err) }

        if (!result) { return resolve(false) }

        resolve(true)
      })
    })
  }
}

module.exports = UserHasScenario
