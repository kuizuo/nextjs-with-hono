import { Hono } from 'hono'

const app = new Hono().get('/hello', (c) => {
  return c.json({ message: 'Hello, Next.js!' })
})

export default app
