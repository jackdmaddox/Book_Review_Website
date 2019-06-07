const db = require('./conn-model');

class Books {
    constructor(id, title, title_long, isbn, publisher, date_published, picture) {
        this.id = id;
        this.title = title;
        this.title_long = title_long;
        this.isbn = isbn;
        this.publisher = publisher;
        this.date_published = date_published;
        this.picture = picture;
    }

    static async getAll(){
        try {
            const response = await db.any(`select * from books`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async getById(id) {
        try {
            const response = await db.one(`select * from books where id=${id}`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async add(title, title_long, isbn, publisher, date_published, picture) {
        const query = `insert into books
        (title, title_long, isbn, publisher, date_published, picture)
    Values ('${title}', '${title_long}','${isbn}', '${publisher}', '${date_published}', '${picture}')`;
        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            console.log ('Error', err.message);
            return err;
        }
    }
}

module.exports = Books;
