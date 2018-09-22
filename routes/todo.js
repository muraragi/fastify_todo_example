async function routes(fastify, options) {
  const Todo = fastify.todoModel

  //Serialization options
  const getAllOpts = {
    schema: {
      description: 'Get all todos',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              completed: { type: 'boolean' },
              _id: { type: 'string' },
              name: { type: 'string' },
              created_date: { type: 'string', format: 'date-time' },
              __v: { type: 'number' },
            },
          },
        },
      },
    },
  }

  const getOneOpts ={
    schema: {
      description: 'Get all todos',
      response: {
        200: {
          type: 'object',
          properties: {
            completed: { type: 'boolean' },
            _id: { type: 'string' },
            name: { type: 'string' },
            created_date: { type: 'string', format: 'date-time' },
            __v: { type: 'number' },
          },
        },
      },
    },
  }

  //Validation Opts
  const createOpts = {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 2 },
        },
      },
    },
  }
  
  const updateOpts = {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 2 },
          completed: {type: 'boolean'}
        },
      },
    },
  }

  //All Todos
  fastify.get('/', getAllOpts, async (request, reply) => {
    const result = await Todo.find({})
    return result
  })

  //One Todo
  fastify.get('/:id', getOneOpts, async (requset, reply) => {
    const id = requset.params.id
    const result = await Todo.findById(id)
    return result
  })

  //New Todo
  fastify.post('/', createOpts, async (request, reply) => {
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

  //Update Todo

  fastify.put('/:id', updateOpts, async (request, reply) => {
    const id = request.params.id
    const updatedTodo = request.body

    await Todo.findByIdAndUpdate(id, updatedTodo)
    reply.code(201)
    return { success: true, id }
  })
}

module.exports = routes
