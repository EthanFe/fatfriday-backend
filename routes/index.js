var express = require('express');
const app = express()
// app.use('/', express.static('build'))

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fat Friday' });
});

module.exports = router;

async function setupSockets() {
  const http = require('http').Server(app);
  // const io = require('socket.io')(http);

  const port = 3000
  const server = http.listen(port, function(){
    console.log(`listening on *:${port}`);
  });
  const io = require('socket.io').listen(server);

  io.on('connection', async (socket) => {
    console.log(`registering for message updates to ${socket.id}`)
    // io.to(socket.id).emit('initialLoadData', game.currentState)

    console.log('a user connected');

    socket.on('createNewEvent', async function({name, username}) {
      console.log(name, username)
      // const message = await addComment(repoID, commitURL, commentContent, topic, username, accessToken)
      // const user = await message.user
      io.emit('eventCreated', {eventName: name, creatorUsername: username})
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

  console.log("Socket is ready.")
}

setupSockets()