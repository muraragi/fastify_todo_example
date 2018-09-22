async function routes(fastify, options) {
  const Todo = fastify.todoModel

  fastify.get('/', async (request, reply) => {
    const result = await Todo.find({})
    return result
  })

  fastify.get('/:id', async (requset, reply) => {
    const id = requset.params.id
    const result = await Todo.findById(id)
    return result
  })

  fastify.post('/', async (request, reply) => {
    const todo = request.body

    await Todo.create(todo)
    reply.code(201)
    return {success: true, id: todo.id}
  })
}

module.exports = routes
