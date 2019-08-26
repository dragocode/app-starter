const nodemailer = require('nodemailer')
const config = require('../../config')

const transport = nodemailer.createTransport(config.mail)

module.exports = transport
