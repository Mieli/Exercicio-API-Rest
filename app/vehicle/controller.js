class VehicleController {
    constructor(repository) {
        this.repository = repository;
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    findAll(req, res) {
        this.repository.findAll()
            .then((results) => {
                if (results.length > 0) {
                    res.json(results);
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(() => {
                res.sendStatus(500);
            })
    }

    findById(req, res) {
        const id = parseInt(req.params.id);
        this.repository.findById(id)
            .then(vehicle => {
                if(vehicle){
                    res.json(vehicle)
                } else {
                    res.sendStatus(404)
                }
            })
            .catch(() => {
                res.sendStatus(500)
            });
    }

    insert(req, res) {
        const { marca, modelo, ano } = req.body
        this.repository.insert({ marca, modelo, ano })
            .then(id => {
                res.status(201).json({ id });
            })
            .catch((error) => {
                console.log(error)
                res.sendStatus(500);
            });
    }
    
    update(req, res){
        const id = parseInt(req.params.id);
        const {marca, modelo, ano} = req.body
        this.repository.update({id, marca, modelo, ano})
            .then(ok => {
                if(ok){
                    res.sendStatus(204)
                } else {
                    res.sendStatus(412)
                }
            })
            .catch(() => {
                res.sendStatus(500)
            });
    }

    remove(req, res){
        const id = parseInt(req.params.id);
        this.repository.remove(id)
            .then(ok => {
               if(ok){
                   res.sendStatus(204)
               } else {
                   res.sendStatus(404)
               }
            })
            .catch(() => {
                res.sendStatus(500)
            });
    }
}

module.exports = VehicleController