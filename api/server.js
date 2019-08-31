const express = require('express')

const server = express()
const projectsRouter= require('./projects/projectsRouter');


server.use(express.json())
server.use('/api/projects', projectsRouter)


server.get('/', async (req, res) => {
  try {
    res.status(200).send('<h3>Welcome to the projects APi</h3>')
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = server