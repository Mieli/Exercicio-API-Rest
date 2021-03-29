const db = require('../../db')
const VehicleRepository = require('./repository')
const VehicleController = require('./controller')
const VehicleRoutes = require('./routes')

const repository = new VehicleRepository(db)
const controller = new VehicleController(repository)
const router = new VehicleRoutes(controller)

module.exports = {
    router
}