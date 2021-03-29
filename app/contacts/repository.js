class ContactRepository {
    constructor(database) {
        this.database = database
        this.tableName = 'contacts'
        this.findAll = this.findAll.bind(this)
        this.findById = this.findById.bind(this)
        this.findByEmail = this.findByEmail.bind(this)
        this.insert = this.insert.bind(this)
        this.update = this.update.bind(this)
        this.remove = this.remove.bind(this)
    }

    async findAll() {
        const sql = `select * from ${this.tableName}`
        let contacts = []
        let connection = null
        try {
            connection = await this.database.getConnection()
            const data = await connection.query(sql)
            contacts = [...data]
        } catch (error) {
            console.log(error)
        } finally {
            connection && connection.end()
        }
        return contacts
    }

    async findById(id) {
        const sql = `select * from ${this.tableName} where id = ?`
        const params = [id]
        let contact = null
        let connection = null
        try {
            connection = await this.database.getConnection()
            const data = await connection.query(sql, params)
            const rows = [...data]
            if (rows.length > 0) {
                contact = rows[0]
            }
        } catch (error) {
            console.log(error)
        } finally {
            connection && connection.end()
        }
        return contact
    }

    findByEmail(email) {

    }

    async insert(contact) {
        const sql = `insert into ${this.tableName} (name, email, phone) values (?, ?, ?)`
        const params = [contact.name, contact.email, contact.phone]
        let connection = null
        let ok = null
        try {
            connection = await this.database.getConnection()
            const { insertId } = await connection.query(sql, params)
            ok = insertId
        } catch (error) {
            console.log(error)
        } finally {
            connection && connection.end()
        }
        return ok
    }

    async update(contact) {
        const sql = `update ${this.tableName} set name = ?, email = ?, phone = ? where id = ?`
        const params = [contact.name, contact.email, contact.phone, contact.id]
        let connection = null
        let ok = false
        try {
            connection = await this.database.getConnection()
            const { affectedRows } = await connection.query(sql, params)
            ok = (affectedRows > 0)
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            connection && connection.end()
        }
        return ok
    }

    async remove(id) {
        const sql = `delete from ${this.tableName} where id = ?`
        const params = [id]
        let connection = null
        let ok = false
        try {
            connection = await this.database.getConnection()
            const { affectedRows } = await connection.query(sql, params)
            ok = (affectedRows > 0)
        } catch (error) {
            console.log(e)
        } finally {
            connection && connection.end()
        }
        return ok
    }
}

module.exports = ContactRepository;