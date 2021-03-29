const db = require('../../db')
const ContactRepository = require('./repository')
const ContactController = require('./controller')
const ContactRoutes = require('./routes')

const repository = new ContactRepository(db)
const controller = new ContactController(repository)
const router = new ContactRoutes(controller)

module.exports = {
    router
}