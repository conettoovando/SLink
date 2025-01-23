import dotenv from 'dotenv'
import express, { json } from 'express'
import { linkRoutes } from './routes/link.js'
import { allCors } from './middlewares/cors.js'
import RedisClient from './middlewares/conRedis.js'
dotenv.config()

export const client = new RedisClient()
client.initializeClientMethod()

const app = express()
app.use(json())
app.use(allCors())
app.disable('x-powered-by')

app.use('/', linkRoutes)

const PORT = process.env.SERVER_PORT ?? 1234

app.listen(PORT, () => {
  console.log('Server listening on port' + PORT)
})
