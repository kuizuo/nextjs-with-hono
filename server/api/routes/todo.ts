import { z } from 'zod'
import { zValidator } from '@/server/api/validator'
import { Hono } from 'hono'

const paramSchema = z.object({
  id: z.string().cuid(),
})

const jsonSchema = z.object({
  status: z.boolean(),
})

const app = new Hono().put(
  '/todo/:id',
  zValidator('param', paramSchema),
  zValidator('json', jsonSchema),
  (c) => {
    const { id } = c.req.valid('param')

    // 逻辑代码...

    return c.json({})
  },
)

export default app
