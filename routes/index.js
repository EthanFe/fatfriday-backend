const {db} = require('../db-direct-postgres.js')
const {catchAsync} = require('../utility.js')

var express = require('express');
const app = express()
// app.use('/', express.static('build'))

var router = express.Router();

module.exports = router;

async function setupSockets() {
  const http = require('http').Server(app);

  const port = 3000
  const server = http.listen(port, function(){
    console.log(`listening on *:${port}`);
  });
  const io = require('socket.io').listen(server);

  io.on('connection', async (socket) => {
    console.log(`New client connected, creating socket connection with socket id ${socket.id}`)
    registerSocketEvents(io, socket)
    sendEventsListToClient(socket)
  });

  console.log("Socket is ready.")
}

setupSockets()

const registerSocketEvents = (io, socket) => {
  socket.on('createNewEvent', async function({name, username, date}) {
    await createEvent(name, username, date)
    sendEventsListToAllClients(io)
  });

  socket.on('login', async ({username}) => {
    console.log(`User attempting to login with name "${username}"`)
    const user = await loginUser(username)
    if (user !== null) {
      delete user.created_on
      socket.emit("loggedIn", user)
    } else {
      socket.emit("loginFailed") // this isn't handled lol
    }
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
}

const sendEventsListToClient = async (socket) => {
  const events = await getEventsList()
  socket.emit("eventList", events)
}

const sendEventsListToAllClients = async (io) => {
  const events = await getEventsList()
  io.emit("eventList", events)
}

const createEvent = (eventName, userName, date) => {
  // insert("events", ["created_by", "name", "event_date", "created_on"], [0, "some dude", new Date().getTime() / 1000, new Date().getTime() / 1000])
  return db.none("INSERT INTO events (created_by, name, event_date, created_on) VALUES($1,$2,to_timestamp($3),to_timestamp($4));",
        [
          0,
          eventName,
          date / 1000,
          new Date().getTime() / 1000
        ])
  .catch(function (error) { console.error('ERROR:', error) })
}

const getEventsList = () => {
  return new Promise((resolve, reject) => {
    db.many("SELECT * FROM events")
    .then(data => resolve(data))
    .catch(error => resolve([]))
  })
}

const loginUser = async (username) => {
  let [error, user] = await catchAsync(db.one("SELECT * FROM users WHERE name=$1", [username]))
  if (user === null) {
    user = await createNewUser(username)
  }
  return user
}

const createNewUser = async (username) => {
  let [error, result] = await catchAsync(db.none("INSERT INTO users (name, created_on) VALUES($1,to_timestamp($2));",
        [
          username,
          new Date().getTime() / 1000
        ]))
  if (error === null) {
    return await db.one("SELECT * FROM users WHERE name=$1", [username])
  } else {
    return null
  }
}