'use-strict'

const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const routes = require('./routes')
const config = require('./config')
const bodyParser = require('body-parser')
const port = config.port

// Se parsea la información que viene en el body del request
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// se implementa middleware de rutas
app.use('/api/v1', routes)

const handleFatalError = (err) => {
  console.error('Fatal error' + err.message)
  console.error(err.stack)

  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandleRejection', handleFatalError)

server.listen(port, () => {
  console.log('Server listening on port ' + port)
})
