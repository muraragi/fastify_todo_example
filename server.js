require('make-promises-safe')

// Require the framework and instantiate it
const fastify = require('fastify')()

fastify.register(require('fastify-formbody'))

//Database Connection
fastify.register(require('./config/connection'), {
  url: 'mongodb://localhost:27017/fastify',
})

//Models plugin
fastify.register(require('./models'))

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
