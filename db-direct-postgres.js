var pgp = require('pg-promise')(/*options*/)

var db = pgp('postgres://localhost:5432/fatfriday-test')

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS events(
    created_by int4 NOT NULL,
    name VARCHAR (50) NOT NULL,
    event_date TIMESTAMP NOT NULL,
    created_on TIMESTAMP NOT NULL,
    id SERIAL PRIMARY KEY
  );
`
db.none(createTableQuery)
// .then(() => {
//   db.none("INSERT INTO events (created_by, name, event_date, created_on) VALUES($1,$2,to_timestamp($3),to_timestamp($4));", [0, "some dude", new Date().getTime() / 1000, new Date().getTime() / 1000])
// })
.catch(error => { console.log('ERROR:', error) })

// db.one('SELECT $1 AS value', 123)
// .then(function (data) {
//   console.log('DATA:', data.value)
// })
// .catch(function (error) {
//   console.log('ERROR:', error)
// })

module.exports = {db};