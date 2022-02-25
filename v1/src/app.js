const express = require('express')
const helmet = require('helmet')
const config = require('./config')
const loaders = require('./loaders')
const { ProjectRoutes, UserRoutes } = require('./api-routes')

config()
loaders()

const app = express()
app.use(express.json())
app.use(helmet())

app.listen(process.env.APP_PORT, () => {
  app.use('/api/v1/projects', ProjectRoutes)
  app.use('/api/v1/users', UserRoutes)
  console.log(`${process.env.APP_PORT} Portundan Sunucu Ayağa Kalktı.`)
})
