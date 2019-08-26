const { env } = process
console.log(env.MAILER_SECURE)
module.exports = {
  host: env.MAILER_HOST,
  port: parseInt(env.MAILER_PORT),
  auth: {
    user: env.MAILER_USER,
    pass: env.MAILER_PASS
  }
}
