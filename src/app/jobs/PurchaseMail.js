const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (jobs, done) {
    console.log('Iniciando Job')
    const { ad, user, content } = jobs.data

    await Mail.sendMail({
      from: '"Eduardo Lima" <eduardo@dragocode.com>',
      to: user.email,
      subject: `Solicitação de compra: ${ad.title}`,
      html: `<p>${content}</p>`
    })
    console.log('Terminando Job')
    return done()
  }
}

module.exports = new PurchaseMail()
