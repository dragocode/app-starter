const kue = require('kue')
const { redis } = require('../../config')
const jobs = require('../jobs')

const Queue = kue.createQueue({ redis: redis })

Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)

module.exports = Queue
