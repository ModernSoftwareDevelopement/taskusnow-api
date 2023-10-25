import express from 'express'
import bodyParser from 'body-parser'
import apiRouter from './routes/api'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use('/api', apiRouter)

// Export the app instance
export default app

// Start the server only if not running tests
if (!module.parent) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}
