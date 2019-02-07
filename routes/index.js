const {db} = require('../db-direct-postgres.js')

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
    registerSocketEvents(socket)
    sendEventsListToClient(socket)
  });

  console.log("Socket is ready.")
}

setupSockets()

const registerSocketEvents = (socket) => {
  socket.on('createNewEvent', async function({name, username, date}) {
    await createEvent(name, username, date)
    sendEventsListToClient(socket)
    // io.emit('eventCreated', {eventName: name, creatorUsername: username})
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
}

const sendEventsListToClient = async (socket) => {
  const events = await getEventsList()
  socket.emit("eventList", events)
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
  .catch(function (error) { console.log('ERROR:', error) })
}

const getEventsList = () => {
  return new Promise((resolve, reject) => {
    db.many("SELECT * FROM events")
    .then(data => resolve(data))
    .catch(error => resolve([]))
  })
}

// sendEventListToAllClients = async () => {
//   console.log(io.emit)
//   const events = await db.many("SELECT * FROM events")
//   io.emit("eventList", events)
// }