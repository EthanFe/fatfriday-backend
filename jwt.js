var jwt = require('jsonwebtoken');

const private = process.env.FATFRIDAY_JWT_PRIVATE

const functions = {
  login: (username) => {
    const token = jwt.sign({ username: username }, private);
    return token
  },

  verify: (token, username) => {
    const decodedToken = jwt.verify(token, private, {username: username})
    return decodedToken
  }
}

module.exports = {jwt: functions}