require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
const config = require('./utils/config')

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.delete('/api/blogs/:id', (request, response) => {
  //try {
  //  await Blog.findByIdAndRemove(request.params.id)
  //  response.status(204).end()
  //} catch (exception) {
  //}
  Blog.findByIdAndRemove(request.params.id)
  .then(result => {
      response.status(204).end()
  })
})

const server = http.createServer(app)
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

//require('dotenv').config()
//const app = require('./app')
//const http = require('http')
//const config = require('./utils/config')
//const server = http.createServer(app)
//server.listen(config.PORT, () => {
//  console.log(`Server running on port ${config.PORT}`)
//})