
class ContactController {
    constructor(repository) {
        this.repository = repository
        this.findAll = this.findAll.bind(this)
        this.findById = this.findById.bind(this)
        this.insert = this.insert.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
    }

    findAll(req, res) {
        this.repository.findAll()
            .then(contacts => {
                if (contacts) {
                    res.json(contacts)
                } else {
                    res.sendStatus(404)
                }
            })
            .catch(() => {
                res.sendStatus(500)
            })
    }

    findById(req, res) {
        const id = parseInt(req.params.id)
        this.repository.findById(id)
            .then((contact) => {
                if (contact) {
                    res.json(contact)
                } else {
                    res.sendStatus(404)
                }
            })
            .catch(() => {
                res.sendStatus(500)
            })
    }

    insert(req, res) {
        const { name, email, phone } = req.body
        this.repository.insert({ name, email, phone })
            .then((id) => {
                res.status(201).json({ id })
            })
            .catch(() => {
                res.sendStatus(500)
            })
    }

    update(req, res) {
        const id = parseInt(req.params.id)
        const { name, email, phone } = req.body
        this.repository.update({ id, name, email, phone })
            .then((ok) => {
                if (ok) {
                    res.sendStatus(204)
                } else {
                    res.sendStatus(412)
                }
            })
            .catch(() => {
                res.sendStatus(500)
            })
    }

    remove(req, res) {
        const id = parseInt(req.params.id)
        this.repository.remove(id)
            .then((ok) => {
                if(ok){
                    res.sendStatus(204)
                } else {
                    res.sendStatus(404)
                }
            })
            .catch(() => {
                res.sendStatus(500)
            })
    }

}

module.exports = ContactController