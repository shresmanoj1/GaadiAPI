const express = require('express')
const server = express()
const path = require('path')

const morgan = require('morgan')
const cors = require('cors')
const router = require('./routes/api')

const { Model } = require('objection')
const knex = require('./config/dbConfig')

const moment = require('moment-timezone')

moment.tz.setDefault('	Asia/Kathmandu')

Model.knex(knex)

server.use(
  cors({
    origin: ['http://127.0.0.1:5200', 'http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
  })
)
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(express.static(path.join(__dirname, 'public')))
server.use(morgan('dev'))

server.use('/api', router)

module.exports = server
