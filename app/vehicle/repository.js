class VehicleRepository {
    constructor(database) {
        this.database = database;
        this.tableName = 'vehicles'
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.insert = this.insert.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
    }

    async findAll() {
        const sql = `select * from ${this.tableName}`;
        let connection = null;
        let results = [];
        try {
            connection = await this.database.getConnection();
            results = await connection.query(sql);
        } catch (error) {
            console.log(error);
        } finally {
            connection && connection.end();
        }
        return results
    }

    async findById(id) {
        const sql = `select * from ${this.tableName} where id = ?`;
        const params = [id]
        let connection = null;
        let vehicle = [];
        try {
            connection = await this.database.getConnection();
            const data = await connection.query(sql, params);
            const rows = [...data]
            if (rows.length > 0) {
                vehicle = rows[0];
            }
        } catch (error) {

        } finally {
            connection && connection.end()
        }
        return vehicle
    }

    async insert(vehicle) {
        const sql = `insert into ${this.tableName} (marca, modelo, ano) values (?, ?, ?)`;
        const params = [vehicle.marca, vehicle.modelo, vehicle.ano]
        let connection = null;
        let ok = false;
        try {
            connection = await this.database.getConnection();
            const { insertId } = await connection.query(sql, params);
            ok = insertId;
        } catch (error) {
            console.log(error);
        } finally {
            connection && connection.end();
        }
        return ok;
    }

    async update(vehicle) {
        const sql = `update ${this.tableName} set marca = ?, modelo = ?, ano = ? where id = ?`;
        const params = [vehicle.marca, vehicle.modelo, vehicle.ano, vehicle.id];
        let connection = null;
        let ok = false
        try {
            connection = await this.database.getConnection();
            const { affectedRows } = await connection.query(sql, params);
            ok = (affectedRows > 0);
        } catch (error) {
            console.log(error);
        } finally {
            connection && connection.end();
        }
        return ok;
    }

    async remove(id) {
        const sql = `delete from ${this.tableName} where id = ?`;
        const params = [id];
        let connection = null;
        let ok = false;
        try {
            connection = await this.database.getConnection();
            const { affectedRows } = await connection.query(sql, params);
            ok = (affectedRows > 0);
        } catch (error) {
            console.log(error);
        } finally {
            connection && connection.end();
        }
        return ok;
    }

}

module.exports = VehicleRepository