const db = require('./db')

const ContactRepository = require('./app/contacts/repository')

const repository = new ContactRepository(db)

async function teste(){
    let contacts  = await repository.findAll()
    console.log(contacts)
    process.exit(0)
}

teste()