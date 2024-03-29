var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE todo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log('already created')
            }else{
                // Table just created, creating some rows
                console.log('creating db');
                var insert = 'INSERT INTO todo (name VALUES (?)'
                db.run(insert, ["test"])
            }
        });  
    }
});
