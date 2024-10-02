import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { z } from 'zod'

const app = new OpenAPIHono()

const ParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '123',
    }),
})

const UserSchema = z
  .object({
    id: z.string().openapi({ example: '123' }),
    name: z.string().openapi({ example: 'John Doe' }),
  })
  .openapi('User')

const route = createRoute({
  method: 'get',
  path: '/api/users/{id}',
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'Retrieve the user',
    },
  },
})

app.openapi(route, async (c) => {
  const { id } = c.req.valid('param')

  // 逻辑代码...
  const user = {
    id,
    name: 'Ultra-man',
  }

  return c.json(user)
})

app.doc('/api/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Demo API',
  },
})

app.get('/api/ui', swaggerUI({ url: '/api/doc' }))

export default app
