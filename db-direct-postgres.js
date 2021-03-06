var pgp = require('pg-promise')(/*options*/)

// var db = pgp('postgres://sneakcow:bears@localhost:5432/fatfriday')
var db = pgp('postgres://@localhost:5432/fatfriday-test')

const dbSetup = async () => {
  console.log("Initializing events table")
  const createEventsTableQuery = `
    CREATE TABLE IF NOT EXISTS events(
      created_by int4 NOT NULL,
      name TEXT NOT NULL check (name <> ''),
      event_date TIMESTAMP NOT NULL,
      created_on TIMESTAMP NOT NULL,
      id SERIAL PRIMARY KEY
    );
  `
  await db.none(createEventsTableQuery).catch(error => { console.log('ERROR:', error) })

  console.log("Initializing users table")
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users(
      name TEXT UNIQUE NOT NULL check (name <> ''),
      password_hash TEXT NOT NULL,
      address TEXT,
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
      event_id int4 NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      accepted boolean NOT NULL,
      created_on TIMESTAMP NOT NULL,
      PRIMARY KEY (user_id, event_id)
    );
  `
  db.none(createEventInvitesTableQuery)
  .catch(error => { console.log('ERROR:', error) })

  console.log("Initializing places table")
  const createPlacesTableQuery = `
    CREATE TABLE IF NOT EXISTS places(
      google_place_id TEXT PRIMARY KEY,
      place_name TEXT NOT NULL,
      latitude FLOAT8 NOT NULL,
      longitude FLOAT8 NOT NULL,
      created_on TIMESTAMP NOT NULL
    );
  `
  db.none(createPlacesTableQuery)
  .catch(error => { console.log('ERROR:', error) })

  console.log("Initializing place suggestions table")
  const createPlaceSuggestionsTableQuery = `
    CREATE TABLE IF NOT EXISTS place_suggestions(
      event_id int4 NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      google_place_id TEXT NOT NULL,
      created_on TIMESTAMP NOT NULL,
      PRIMARY KEY (event_id, google_place_id)
    );
  `
  db.none(createPlaceSuggestionsTableQuery)
  .catch(error => { console.log('ERROR:', error) })

  console.log("Initializing place votes table")
  const createPlaceVotesTableQuery = `
    CREATE TABLE IF NOT EXISTS place_votes(
      user_id int4 NOT NULL,
      event_id int4 NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      google_place_id TEXT NOT NULL,
      created_on TIMESTAMP NOT NULL,
      PRIMARY KEY (user_id, event_id, google_place_id)
    );
  `
  db.none(createPlaceVotesTableQuery)
  .catch(error => { console.log('ERROR:', error) })

  console.log("Initializing messages table")
  const createMessagesTableQuery = `
    CREATE TABLE IF NOT EXISTS messages(
      user_id int4 NOT NULL,
      event_id int4 NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      message_body TEXT NOT NULL,
      created_on TIMESTAMP NOT NULL,
      id SERIAL PRIMARY KEY
    );
  `
  db.none(createMessagesTableQuery)
  .catch(error => { console.log('ERROR:', error) })
}

dbSetup()

module.exports = {db};