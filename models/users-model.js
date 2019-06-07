const db = require('./conn-model'),
    bcrypt = require('bcryptjs');

class User {
    constructor (id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    async checkPassword(hashedPassword) {
        //syntact: bcrypt.comapresynce(part one, part two)
        //first argument is what user puts in form, second is hashed password. Returns true or false
        return bcrypt.compareSync(this.password, hashedPassword);
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

    async login() {
        try {
                const response = await db.one(`
                    select id, first_name, last_name, password
                        from users
                    where email = $1`, [this.email]);
                console.log('hash is', response.password);
                const isValid = await this.checkPassword(response.password);
                console.log('is it valid?', isValid);
                if (!!isValid) { /// if isvalid === absolutely true
                    // then we destructure values we want from the response
                    const { first_name, last_name, id } = response;
                    //this lines will return the isValid, first name, last name and user id
                    return { isValid, first_name, last_name, user_id: id}
                } else {
                    // otherwise just return the false isvalid
                    return { isValid } 
                };
        } catch(err) {
            return err.message;
        }
    }

}

module.exports = User