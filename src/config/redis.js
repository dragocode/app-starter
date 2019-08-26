const { env } = process
module.exports = {
  host: env.REDIS_HOST,
  port: parseInt(env.REDIS_PORT)
}
