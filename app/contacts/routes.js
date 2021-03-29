class ContactRouter{
    constructor(controller){
        this.controller = controller
        this.configure = this.configure.bind(this)
    }

    configure(app){
        app.get('/api/contacts', this.controller.findAll)
        app.get('/api/contacts/:id', this.controller.findById)
        app.post('/api/contacts', this.controller.insert)
        app.put('/api/contacts/:id', this.controller.update)
        app.delete('/api/contacts/:id', this.controller.remove)

    }
}

module.exports = ContactRouter;