'use-strict'

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '93.188.165.3',
  port: 3306,
  user: 'egandres1997',
  password: '25531673enzo',
  database: 'ad_house',
  insecureAuth: true
})

connection.connect()

module.exports = connection
