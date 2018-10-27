'use-strict'

const http = require('http')
const app = require('express')()
const server = http.createServer(app)
const routes = require('./routes')
const config = require('./config')
const port = config.port

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

