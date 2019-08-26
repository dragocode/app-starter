const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const validate = require('express-validation')
const Youch = require('youch')
const User = require('./app/models/User')
class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'
    this.database()
    this.middlewares()
    this.routes()
    this.exception()
    this.initUser()
  }

  database () {
    mongoose.connect(config.database.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }

  async initUser () {
    const user = await User.findOne({ name: 'admin' })

    if (!user) {
      User.create({
        name: 'admin',
        email: 'admin@admin.com',
        password: 'admin'
      })
    }
  }

  exception () {
    /**
     * Quando o middleware tem 4 parâmetros
     * o express entende que ele é uma tratativa de erros
     */

    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err, req)
        return res.send(await youch.toHTML())
      }

      return res
        .status(err.status || 500)
        .json({ error: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express
