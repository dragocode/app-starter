const { env } = process

module.exports = {
  uri: env.MONGO_URI
}
