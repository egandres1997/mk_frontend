'use-strict'

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '93.188.165.3',
  port: 3306,
  user: 'aduser',
  password: 'asd123',
  database: 'ad_house',
  insecureAuth: true
})

connection.connect()

module.exports = connection
