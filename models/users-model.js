const db = require('./conn-model');

class User {
    constructor (id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    async save() {
        try {
            const response = await db.one(
                `insert into users
                    (first_name, last_name, email, password)
                values
                    ($1, $2, $3, $4)
                returning id
                `, [this.first_name, this.last_name, this.email, this.password]);
            console.log('user was created with id:', response.id);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    async getUserByEmail() {
        try {
            const userData = await db.one(`
            select id, first_name, last_name, password
                from users
            where email = $1`, 
            [this.email]);
            return userData;
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = User