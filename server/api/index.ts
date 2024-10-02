import { handleError } from './error'
import { Hono } from 'hono'
import usersRoute from './routes/users'
import todoRoute from './routes/todo'
import helloRoute from './routes/hello'
const app = new Hono().basePath('/api')

app.onError(handleError)

const routes = app
  .route('/', helloRoute)
  .route('/', usersRoute)
  .route('/', todoRoute)

export default app

export type AppType = typeof routes
