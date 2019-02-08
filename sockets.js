const {insert, selectOne, selectMultiple} = require('./dbfunctions.js')

var express = require('express');
const app = express()

const setupSockets = async () => {
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
    sendUsersListToClient(socket)
  });

  console.log("Socket is ready.")
}

module.exports = {setupSockets};

const registerSocketEvents = (io, socket) => {
  socket.on('createNewEvent', async function({name, user_id, date}) {
    await createEvent(name, user_id, date)
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

  socket.on('inviteUserToEvent', ({username, event_id}) => {
    console.log(`Inviting user ${username} to event with id ${event_id}` )
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

const sendUsersListToClient = async (socket) => {
  let users = await getUsersList()
  users = users.map(user => {
    delete user.created_on
    delete user.address
    return user
  })
  socket.emit("invitableUsersList", users)
}

const createEvent = (eventName, user_id, date) => {
  return insert({tableName: "events", columns: [
      "created_by",
      "name",
      "event_date",
      "created_on"
    ], values: [
      user_id,
      eventName,
      date / 1000,
      new Date().getTime() / 1000
    ],
    modifiers: [
      null,
      null,
      "to_timestamp",
      "to_timestamp"
    ]})
}

const getEventsList = () => {
  return new Promise((resolve) => {
    resolve(selectMultiple({tableName: "events"}))
  })
}

const getUsersList = () => {
  return new Promise((resolve) => {
    resolve(selectMultiple({tableName: "users"}))
  })
}

const loginUser = async (username) => {
  let user = await selectOne({tableName: "users", keys: ["name"], values: [username]})
  if (user === null) {
    user = await createNewUser(username)
  }
  return user
}

const createNewUser = async (username) => {
  let [error, result] = await insert({tableName: "users", columns: [
    "name",
    "created_on"
  ], values: [
    username,
    new Date().getTime() / 1000
  ],
  modifiers: [
    null,
    "to_timestamp"
  ]})
  if (error === null) {
    return await selectOne({tableName: "users", keys: ["name"], values: [username]})
  } else {
    return null
  }
}