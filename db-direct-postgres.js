var pgp = require('pg-promise')(/*options*/)

var db = pgp('postgres://localhost:5432/fatfriday-test')

console.log("Initializing events table")
const createEventsTableQuery = `
  CREATE TABLE IF NOT EXISTS events(
    created_by int4 NOT NULL,
    name VARCHAR (50) NOT NULL check (name <> ''),
    event_date TIMESTAMP NOT NULL,
    created_on TIMESTAMP NOT NULL,
    id SERIAL PRIMARY KEY
  );
`
db.none(createEventsTableQuery)
.catch(error => { console.log('ERROR:', error) })

console.log("Initializing users table")
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users(
    name VARCHAR (50) UNIQUE NOT NULL check (name <> ''),
    address VARCHAR (50),
    created_on TIMESTAMP NOT NULL,
    id SERIAL PRIMARY KEY
  );
`
db.none(createUsersTableQuery)
.catch(error => { console.log('ERROR:', error) })

console.log("Initializing event invites table")
const createEventInvitesTableQuery = `
  CREATE TABLE IF NOT EXISTS event_invites(
    user_id int4 NOT NULL,
    event_id int4 NOT NULL,
    accepted boolean NOT NULL,
    created_on TIMESTAMP NOT NULL,
    primary key (user_id, event_id)
  );
`
db.none(createEventInvitesTableQuery)
.catch(error => { console.log('ERROR:', error) })

module.exports = {db};