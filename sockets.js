const {db} = require('./dbfunctions.js')
const {jwt} = require('./jwt.js')
const {createNewUser, attemptLogin} = require ('./authentication.js')
const fetch = require('node-fetch');

const setupSockets = async (http) => {
  const port = process.env.PORT || '3000'
  const server = http.listen(port, function(){
    console.log(`listening on *:${port}`);
  });
  const io = require('socket.io').listen(server);

  io.on('connection', async (socket) => {
    console.log(`New client connected, creating socket connection with socket id ${socket.id}`)
    registerSocketEvents(io, socket)
    sendInitialDataToConnectingClient(socket)
  });

  console.log("Socket is ready.")
}

module.exports = {setupSockets};

const onlineUsers = []

const registerSocketEvents = (io, socket) => {
  socket.on('login', async ({username, password}) => {
    console.log(`User attempting to login with name "${username}"`)
    const user = await attemptLogin(username, password)
    emitLoginResult(user, socket)
    addToOnlineUsers(user.id, socket, io)
  })

  socket.on('signUp', async ({username, password}) => {
    console.log(`User attempting to sign up with name "${username}"`)
    const user = await createNewUser(username, password)
    emitLoginResult(user, socket)
    addToOnlineUsers(user.id, socket, io)
    sendUsersListToAllClients(io)
  })

  socket.on("logout", async ({token, user_id}) => {
    const verified = jwt.verify(token, user_id)
    if (verified) {
      removeFromOnlineUsers(user_id, socket, io)
      sendUsersListToAllClients(io)
    }
  })

  socket.on('createNewEvent', async function({token, name, user_id, date}) {
    const verified = jwt.verify(token, user_id)
    if (verified) {
      await createEvent(name, user_id, date)
      sendEventsListToAllClients(io)
    }
  });

  socket.on('inviteUserToEvent', async ({token, user_id, invitee_user_id, event_id}) => {
    console.log(`Inviting user with id ${invitee_user_id} to event with id ${event_id}` )
    const verified = jwt.verify(token, user_id)
    if (verified) {
      await createInvitation(invitee_user_id, event_id)
      sendInvitationsListToAllClients(io)
    }
  })

  socket.on('acceptInvitation', async ({token, user_id, event_id}) => {
    console.log(`User with id ${user_id} accepting invitation to event with id ${event_id}` )
    const verified = jwt.verify(token, user_id)
    if (verified) {
      await acceptInvitation(user_id, event_id)
      sendInvitationsListToAllClients(io)
    }
  })

  socket.on('placeTextEntered', async ({token, user_id, text}) => {
    const verified = jwt.verify(token, user_id)
    if (verified) {
      console.log(`Searching for places with name ${text}`)
      
      const apiKey = process.env.GOOGLE_API_KEY
      const latitude = "29.747055"
      const longitude = "-95.372617"
      const searchRadius = 5000
      const request = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${apiKey}&location=${latitude},${longitude}&radius=${searchRadius}&types=establishment`
      const response = await fetch(request)
      const result = await response.json()
      if (result.status === "OK") {
        const locations = result.predictions.map(prediction => ({placeName: prediction.description, placeID: prediction.place_id}))
        console.log(`Returning ${locations.length} matches`)
        socket.emit("placeNameMatches", locations)
      } else {
        console.error(`Place search request failed for unclear reasons because I don't write clear error messages`)
      }
    }
  })

  socket.on('suggestPlace', async ({token, user_id, place_id, place_name, event_id}) => {
    const verified = jwt.verify(token, user_id)
    if (verified) {
      console.log(`User with id ${user_id} trying to suggest "${place_name}" (id ${place_id}) for event with id ${event_id}`)
      await suggestPlace(user_id, event_id, place_id, place_name)
      sendPlaceSuggestionsToAllClients(io)
    }
  })

  socket.on('voteForPlace', async ({token, user_id, place_id, event_id, setVoteTo}) => {
    const verified = jwt.verify(token, user_id)
    if (verified) {
      if (setVoteTo) {
        console.log(`User with id ${user_id} voting for place with id ${place_id}) for event with id ${event_id}`)
        await voteForPlace(user_id, event_id, place_id)
      } else {
        console.log(`User with id ${user_id} removing vote for place with id ${place_id}) for event with id ${event_id}`)
        await removeVoteForPlace(user_id, event_id, place_id)
      }
      sendPlaceSuggestionsToAllClients(io)
    }
  })

  socket.on('removeEvent', async ({token, user_id, event_id}) => {
    const verified = jwt.verify(token, user_id)
    if (verified) {
      const removed = await removeEvent(event_id, user_id)
      if (removed) {
        sendEventsListToAllClients(io)
        sendInvitationsListToAllClients(io)
        sendPlaceSuggestionsToAllClients(io)
        sendMessagesListToAllClients(io)
        // is all this necessary? who knows. it's a mystery. but i'm lazy
      }
    }
  })

  socket.on('sendMessage', async ({token, user_id, event_id, message}) => {
    const verified = jwt.verify(token, user_id)
    if (verified) {
      await sendMessage(event_id, user_id, message)
      sendMessagesListToAllClients(io)
    }
  })

  socket.on('editMessage', async({token, user_id, message_id, new_message}) => {
    const verified = jwt.verify(token, user_id)
    if (verified) {
      const messageEdited = await editMessage(user_id, message_id, new_message)
      if (messageEdited) {
        sendMessagesListToAllClients(io)
      }
    }
  })

  socket.on('deleteMessage', async({token, user_id, message_id}) => {
    const verified = jwt.verify(token, user_id)
    if (verified) {
      const messageDeleted = await deleteMessage(user_id, message_id)
      if (messageDeleted) {
        sendMessagesListToAllClients(io)
      }
    }
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
    removeFromOnlineUsers(null, socket, io)
  });
}

const emitLoginResult = (user, socket) => {
  if (user !== null) {
    delete user.created_on
    delete user.password_hash
    user.token = jwt.login(user.id)
    socket.emit("loggedIn", {user})
  } else {
    socket.emit("signUpOrLoginFailed") // this isn't handled lol
  }
}

const addToOnlineUsers = (userID, socket, io) => {
  const onlineUser = onlineUsers.find(user => user.userID === userID)
  if (onlineUser === undefined) {
    onlineUsers.push({userID: userID, socketID: socket.id})
    sendOnlineUsersListToAllClients(io)
  } else {
    if (onlineUser.socketID !== socket.id) { // not sure when this would be false but maybe it'll be useful at some point
      onlineUser.socketID = socket.id
    }
  }
}

const removeFromOnlineUsers = (userID, socket, io) => {
  const onlineUser = onlineUsers.find(user => user.socketID === socket.id)
  if (onlineUser !== undefined) {
    onlineUsers.splice(onlineUsers.indexOf(onlineUser), 1)
    sendOnlineUsersListToAllClients(io)
  }
}

const sendInitialDataToConnectingClient = async (socket) => {
  const events = await getEventsList()
  let users = await getUsersList()
  users = users.map(user => {
    delete user.created_on
    delete user.address
    delete user.password_hash
    return user
  })
  let invites = await getInvitesList()
  invites = invites.map(invite => {
    delete invite.created_on
    return invite
  })
  const placeSuggestions = await getPlaceSuggestions()
  const messages = await getMessages()
  const onlineUserIDs = onlineUsers.map(onlineUser => onlineUser.userID)
  socket.emit("initialData", {events, users, invites, placeSuggestions, messages, onlineUserIDs})
}

const sendEventsListToAllClients = async (io) => {
  const events = await getEventsList()
  io.emit("eventList", events)
}

const sendInvitationsListToAllClients = async (io) => {
  let invites = await getInvitesList()
  invites = invites.map(invite => {
    delete invite.created_on
    return invite
  })
  io.emit("invitesList", invites)
}

const sendPlaceSuggestionsToAllClients = async (io) => {
  const placeSuggestions = await getPlaceSuggestions()
  io.emit("placeSuggestions", placeSuggestions)
}

const sendUsersListToAllClients = async (io) => {
  let users = await getUsersList()
  users = users.map(user => {
    delete user.created_on
    delete user.address
    return user
  })
  io.emit("invitableUsersList", users)
}

const sendMessagesListToAllClients = async (io) => {
  const messages = await getMessages()
  io.emit("messages", messages)
}

const sendOnlineUsersListToAllClients = async (io) => {
  const onlineUserIDs = onlineUsers.map(onlineUser => onlineUser.userID)
  io.emit("onlineUsers", onlineUserIDs)
}

const createEvent = (eventName, user_id, date) => {
  return db.insert({tableName: "events", columns: [
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
    resolve(db.selectMultiple({tableName: "events"}))
  })
}

const getUsersList = () => {
  return new Promise((resolve) => {
    resolve(db.selectMultiple({tableName: "users"}))
  })
}

const getInvitesList = () => {
  return new Promise((resolve) => {
    resolve(db.selectMultiple({tableName: "event_invites"}))
  })
}

const getPlaceSuggestions = () => {
  return new Promise(async (resolve) => {
    let placeSuggestions = await db.selectMultiple({tableName: "place_suggestions"})

    placeSuggestions = await Promise.all(placeSuggestions.map(async (suggestion) => {
      suggestion.placeData = await getDataOfPlaceSuggestion(suggestion)
      return suggestion
    }))
    placeSuggestions = await Promise.all(placeSuggestions.map(async (suggestion) => {
      suggestion.votes = await getVotesForPlace(suggestion)
      return suggestion
    }))
    resolve(placeSuggestions)
  })
}

const getDataOfPlaceSuggestion = async (suggestion) => {
  const place = await db.selectOne({tableName: "places", keys: ["google_place_id"], values: [suggestion.google_place_id]})
  return {name: place.place_name, location: {latitude: place.latitude, longitude: place.longitude}}
}

const getVotesForPlace = (suggestion) => {
  return new Promise(async (resolve) => {
    // this will probably throw an error if there are no votes. i really gotta fix db.selectMultiple
    const votes = await db.selectMultiple({
      tableName: "place_votes",
      keys: ["google_place_id", "event_id"],
      values: [suggestion.google_place_id, suggestion.event_id]
    })
    // something feels like this doesnt make any fucking sense because this is an array, not an object. 🤔
    delete votes.created_on
    resolve(votes)
  })
}

const getMessages = () => {
  return new Promise((resolve) => {
    resolve(db.selectMultiple({tableName: "messages"}))
  })
}

const createInvitation = async (user_id, event_id) => {
  let [error, result] = await db.insert({tableName: "event_invites", columns: [
    "user_id",
    "event_id",
    "accepted",
    "created_on"
  ], values: [
    user_id,
    event_id,
    false,
    new Date().getTime() / 1000
  ],
  modifiers: [
    null,
    null,
    null,
    "to_timestamp"
  ]})
  return error === null
}

const acceptInvitation = async (user_id, event_id) => {
  const [error, result] = await db.update({tableName: "event_invites", conditions: [
    {name: "user_id", value: user_id},
    {name: "event_id", value: event_id}
  ], valuesToSet: [
    {name: "accepted", value: true}
  ]})
  return error === null
}

const suggestPlace = async (user_id, event_id, place_id, place_name) => {
  // this throws an error because it doesn't find anything. lol
  let place = await db.selectOne({tableName: "places", keys: ["google_place_id"], values: [place_id]})
  if (place === null) {
    place = await createNewPlace(place_id, place_name)
  }
  if (place === null) {
    console.error("Creating new place entry failed. Did not create new place suggestion.")
    return false
  } else {
    let [error, result] = await db.insert({tableName: "place_suggestions", columns: [
      "event_id",
      "google_place_id",
      "created_on"
    ], values: [
      event_id,
      place_id,
      new Date().getTime() / 1000
    ],
    modifiers: [
      null,
      null,
      "to_timestamp"
    ]})

    voteForPlace(user_id, event_id, place_id)
    return error === null
  }
}

const createNewPlace = async (place_id, place_name) => {
  const apiKey = process.env.GOOGLE_API_KEY
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&placeid=${place_id}&fields=geometry`)
  const json = await response.json()
  let latitude, longitude = null
  if (json.status === "OK") {
    const location = json.result.geometry.location
    latitude = location.lat
    longitude = location.lng
  }
  let [error, result] = await db.insert({tableName: "places", columns: [
    "google_place_id",
    "place_name",
    "latitude",
    "longitude",
    "created_on"
  ], values: [
    place_id,
    place_name,
    latitude,
    longitude,
    new Date().getTime() / 1000
  ],
  modifiers: [
    null,
    null,
    null,
    null,
    "to_timestamp"
  ]})
  if (error === null) {
    return await db.selectOne({tableName: "places", keys: ["google_place_id"], values: [place_id]})
  } else {
    console.error("Error creating new place")
    console.error(error)
    return null
  }
}

const voteForPlace = async (user_id, event_id, place_id) => {
  const [error, result] = await db.insert({tableName: "place_votes", columns: [
    "user_id",
    "event_id",
    "google_place_id",
    "created_on"
  ], values: [
    user_id,
    event_id,
    place_id,
    new Date().getTime() / 1000
  ],
  modifiers: [
    null,
    null,
    null,
    "to_timestamp"
  ]})
  return error === null
}

const removeVoteForPlace = async (user_id, event_id, place_id) => {
  const [error, result] = await db.remove({tableName: "place_votes", conditions: [
    {name: "user_id", value: user_id},
    {name: "event_id", value: event_id},
    {name: "google_place_id", value: place_id}
  ]})
  // this is sorta weird and feels redundant with getVotesForPlace(). idk
  const remainingVotes = await db.selectMultiple({
    tableName: "place_votes",
    keys: ["google_place_id", "event_id"],
    values: [place_id, event_id]
  })
  if (remainingVotes.length < 1) {
    await removePlaceSuggestion(event_id, place_id)
  }
  return error === null
}

const removePlaceSuggestion = async (event_id, place_id) => {
  const [error, result] = await db.remove({tableName: "place_suggestions", conditions: [
    {name: "event_id", value: event_id},
    {name: "google_place_id", value: place_id}
  ]})
  return error === null
}

const removeEvent = async (event_id, user_id) => {
  const event = await db.selectOne({tableName: "events", keys: ["id", "created_by"], values: [event_id, user_id]})
  if (event !== null) {
    const [error, result] = await db.remove({tableName: "events", conditions: [
      {name: "id", value: event_id},
      {name: "created_by", value: user_id}
    ]})
    console.log(error)
    return error === null
  } else {
    return false
  }
}

const sendMessage = async (event_id, user_id, message) => {
  const [error, result] = await db.insert({tableName: "messages", columns: [
    "user_id",
    "event_id",
    "message_body",
    "created_on"
  ], values: [
    user_id,
    event_id,
    message,
    new Date().getTime() / 1000
  ],
  modifiers: [
    null,
    null,
    null,
    "to_timestamp"
  ]})
  return error === null
}

const editMessage = async (user_id, message_id, message) => {
  const [error, result] = await db.update({tableName: "messages", conditions: [
    {name: "id", value: message_id},
    {name: "user_id", value: user_id}
  ], valuesToSet: [
    {name: "message_body", value: message}
  ]})
  return error === null
}

const deleteMessage = async (user_id, message_id) => {
  const [error, result] = await db.remove({tableName: "messages", conditions: [
    {name: "user_id", value: user_id},
    {name: "id", value: message_id}
  ]})
  return error === null
}