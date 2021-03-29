const routes = [
    require('./app/contacts').router,
    require('./app/vehicle').router
]

function configure(app){
    for(let route of routes){
        route.configure(app)
    }
}

module.exports = {
    configure
}