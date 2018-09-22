require('make-promises-safe')

// Require the framework and instantiate it
const fastify = require('fastify')()

// Declare a route
fastify.register(require('./routes/todo'))

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()