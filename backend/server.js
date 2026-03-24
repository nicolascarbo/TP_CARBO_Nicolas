import express from 'express'
import usersRouter from './routes/users.js'

const app = express()
const port = 3001

app.use('/api/users', usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
