var jwt = require('jsonwebtoken');

const private = process.env.FATFRIDAY_JWT_PRIVATE

const functions = {
  login: (user_id) => {
    const token = jwt.sign({ user_id: user_id }, private);
    return token
  },

  verify: (token, user_id) => {
    const decodedToken = jwt.verify(token, private, {user_id: user_id})
    return decodedToken.user_id === user_id
  }
}

module.exports = {jwt: functions}