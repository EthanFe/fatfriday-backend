const {insert, selectOne, selectMultiple, update} = require('./dbfunctions.js')
const fetch = require('node-fetch');

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
    sendInitialDataToConnectingClient(socket)
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

  socket.on('inviteUserToEvent', async ({user_id, event_id}) => {
    console.log(`Inviting user with id ${user_id} to event with id ${event_id}` )
    await createInvitation(user_id, event_id)
    sendInvitationsListToAllClients(io)
  })

  socket.on('acceptInvitation', async ({user_id, event_id}) => {
    console.log(`User with id ${user_id} accepting invitation to event with id ${event_id}` )
    await acceptInvitation(user_id, event_id)
    sendInvitationsListToAllClients(io)
  })

  socket.on('placeTextEntered', async ({text}) => {
    console.log(`Searching for places with name ${text}`)
    
    const apiKey = process.env.GOOGLE_API_KEY
    const latitude = "29.747055"
    const longitude = "-95.372617"
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${apiKey}&location=${latitude},${longitude}&types=establishment`)
    const result = await response.json()
    if (result.status === "OK") {
      const locations = result.predictions.map(prediction => ({placeName: prediction.description, placeID: prediction.place_id}))
      console.log(`Returning ${locations.length} matches`)
      socket.emit("placeNameMatches", locations)
    } else {
      console.error(`Place search request failed for unclear reasons because I don't write clear error messages`)
    }
  })

  socket.on('suggestPlace', async ({user_id, place_id, place_name, event_id}) => {
    console.log(`User with id ${user_id} trying to suggest "${place_name}" (id ${place_id}) for event with id ${event_id}`)
    await suggestPlace(user_id, event_id, place_id, place_name)
    sendPlaceSuggestionsToAllClients(io)
  })

  socket.on('voteForPlace', async ({user_id, place_id, event_id}) => {
    console.log(`User with id ${user_id} trying to vote for place with id ${place_id}) for event with id ${event_id}`)
    await voteForPlace(user_id, event_id, place_id)
    sendPlaceSuggestionsToAllClients(io)
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
}

const sendInitialDataToConnectingClient = async (socket) => {
  const events = await getEventsList()
  let users = await getUsersList()
  users = users.map(user => {
    delete user.created_on
    delete user.address
    return user
  })
  let invites = await getInvitesList()
  invites = invites.map(invite => {
    delete invite.created_on
    return invite
  })
  const placeSuggestions = await getPlaceSuggestions()
  socket.emit("initialData", {events, users, invites, placeSuggestions})
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

const getInvitesList = () => {
  return new Promise((resolve) => {
    resolve(selectMultiple({tableName: "event_invites"}))
  })
}

const getPlaceSuggestions = () => {
  return new Promise(async (resolve) => {
    let placeSuggestions = await selectMultiple({tableName: "place_suggestions"})

    placeSuggestions = await Promise.all(placeSuggestions.map(async (suggestion) => {
      suggestion.name = await getNameOfPlaceSuggestion(suggestion)
      return suggestion
    }))
    placeSuggestions = await Promise.all(placeSuggestions.map(async (suggestion) => {
      suggestion.votes = await getVotesForPlace(suggestion)
      return suggestion
    }))
    resolve(placeSuggestions)
  })
}

const getNameOfPlaceSuggestion = async (suggestion) => {
  const place = await selectOne({tableName: "places", keys: ["google_place_id"], values: [suggestion.google_place_id]})
  return place.place_name
}

const getVotesForPlace = (suggestion) => {
  return new Promise(async (resolve) => {
    // this will probably throw an error if there are no votes. i really gotta fix selectmultiple
    const votes = await selectMultiple({
      tableName: "place_votes",
      keys: ["google_place_id", "event_id"],
      values: [suggestion.google_place_id, suggestion.event_id]
    })
    resolve(votes.length)
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

const createInvitation = async (user_id, event_id) => {
  let [error, result] = await insert({tableName: "event_invites", columns: [
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
  const [error, result] = await update({tableName: "event_invites", conditions: [
    {name: "user_id", value: user_id},
    {name: "event_id", value: event_id}
  ], valuesToSet: [
    {name: "accepted", value: true}
  ]})
  return error === null
}

const suggestPlace = async (user_id, event_id, place_id, place_name) => {
  // user_id is unused but should be used to verify whether user is actually a member of event/allowed to suggest places

  // this throws an error because it doesn't find anything. lol
  let place = await selectOne({tableName: "places", keys: ["google_place_id"], values: [place_id]})
  if (place === null) {
    place = await createNewPlace(place_id, place_name)
  }
  if (place === null) {
    console.error("Creating new place entry failed. Did not create new place suggestion.")
    return false
  } else {
    let [error, result] = await insert({tableName: "place_suggestions", columns: [
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
    return error === null
  }
}

const createNewPlace = async (place_id, place_name) => {
  let [error, result] = await insert({tableName: "places", columns: [
    "google_place_id",
    "place_name",
    "created_on"
  ], values: [
    place_id,
    place_name,
    new Date().getTime() / 1000
  ],
  modifiers: [
    null,
    null,
    "to_timestamp"
  ]})
  if (error === null) {
    return await selectOne({tableName: "places", keys: ["google_place_id"], values: [place_id]})
  } else {
    return null
  }
}

const voteForPlace = async (user_id, event_id, place_id) => {
  let [error, result] = await insert({tableName: "place_votes", columns: [
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