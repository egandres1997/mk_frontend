'use-strict'

const env = require('dotenv').config()

module.exports = {
  port: process.env.PORT || 3000,
  jwtKey: {
    secret: process.env.JWT_KEY
  },
  database: {
	host: process.env.DB_HOST || '93.188.165.3',
	port: process.env.DB_PORT || 3306,
	user: process.env.DB_USERNAME || 'egandres1997',
	password: process.env.DB_PASSWORD || '25531673enzo',
	database: process.env.DB_DATABASE || 'ad_house', 
	insecureAuth: process.env.DB_INSECURE_AUTH || true
  }
}
