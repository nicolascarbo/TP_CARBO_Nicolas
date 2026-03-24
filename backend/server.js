import express from 'express'
import usersRouter from './routes/users.js'
import loggerMiddleware from './middleware/logger.js'

const app = express()
const port = 3001

app.use(express.json())

app.use(loggerMiddleware)
app.use('/api/users', usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
