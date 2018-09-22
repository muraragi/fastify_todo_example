async function routes(fastify, options) {
  const Todo = fastify.todoModel

  //All Todos
  fastify.get('/', async (request, reply) => {
    const result = await Todo.find({})
    return result
  })

  //One Todo
  fastify.get('/:id', async (requset, reply) => {
    const id = requset.params.id
    const result = await Todo.findById(id)
    return result
  })

  //New Todo
  fastify.post('/', async (request, reply) => {
    const todo = request.body

    await Todo.create(todo)
    reply.code(201)
    return { success: true, id: todo.id }
  })

  //Delete Todo
  fastify.delete('/:id', async (request, reply) => {
    const id = request.params.id

    await Todo.findByIdAndRemove(id)
    reply.code(201)
    return { success: true, id }
  })
}

module.exports = routes
