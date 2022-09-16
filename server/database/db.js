const path = require('path');
const sqlite3 = require('sqlite3');

const DB_PATH = path.join(__dirname,"/db.db");

class MyDatabase {
    constructor(path) {
        this.db = new sqlite3.Database(path, (err) => {
            if (err) {
                console.log(`Error - ${err.message}`);
            } else {
                console.log('DataBase Connected');
            }
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log('Error running sql (run): ' + err)
                    reject(err)
                }
                else {
                    resolve({ lastID: this.lastID });
                }
            })
        })
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql (get): ' + err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    exec(sql) {
        return new Promise((resolve, reject) => {
            this.db.exec(sql, function (err, row) {
                if (err) {
                    console.log('Error running sql (exec): ' + err)
                    reject(err)
                } else {
                    resolve(row)
                }
            });
        });
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error running sql (all): ' + err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

const myDB = new MyDatabase(DB_PATH);
module.exports = myDB;