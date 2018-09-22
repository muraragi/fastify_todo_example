const fastifyPlugin = require('fastify-plugin')

const models = (fastify, options, next) => {
  fastify.decorate('todoModel', require('./todo'))
  next()
}

module.exports = fastifyPlugin(models)
