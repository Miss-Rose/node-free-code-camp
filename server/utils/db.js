const path = require('path');
const sqlite3 = require('sqlite3');

const _path = path.join(__dirname, '/projectDB.db');

class MyDatabase {
    constructor(_path) {
        this.db = new sqlite3.Database(_path, (err) => {
            if (err) {
                console.log(`Error Occured - ${err.message}`);
            } else {
                console.log('DataBase Connected');
            }
        });
    }

    async run () {
        const query = 'CREATE TABLE GFG ( ID NUMBER , USER VARCHAR(100 ));';
        await this.db.run(query, (err) => {
            if (err) {
                console.log('Some Error Occured', err);
            } else {
                console.log('Table Created');
            }
        });
    }
}

const myDB = new MyDatabase(_path);


module.exports = myDB;