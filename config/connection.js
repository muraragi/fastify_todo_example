const fastifyPlugin = require('fastify-plugin')
const mongoose = require('mongoose')

function mongooseConnector(fastify, options, next) {
  mongoose.connect(
    options.url,
    { useNewUrlParser: true }
  )
  let db = mongoose.connection
  mongoose.Promise = global.Promise
  db.on('error', console.error.bind(console, 'Connection error:'))
  db.once('open', function() {
    console.log(`Connected to ${options.url}`)
    if (!fastify.mongo) {
      fastify.decorate('mongo', mongoose)
    }
    delete options.url
    next()
  })
}

module.exports = fastifyPlugin(mongooseConnector)
