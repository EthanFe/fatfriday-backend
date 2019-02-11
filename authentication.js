const {db} = require('./dbfunctions');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createNewUser = async (username, password) => {
  const passwordHash = await bcrypt.hash(password, saltRounds)
  return await storeNewUser(username, passwordHash)
}

const storeNewUser = async (username, passwordHash) => {
  let [error, result] = await db.insert({tableName: "users", columns: [
    "name",
    "password_hash",
    "created_on"
  ], values: [
    username,
    passwordHash,
    new Date().getTime() / 1000
  ],
  modifiers: [
    null,
    null,
    "to_timestamp"
  ]})
  if (error === null) {
    return await db.selectOne({tableName: "users", keys: ["name"], values: [username]})
  } else {
    return null
  }
}
 
const attemptLogin = async (username, password) => {
  const user = await getUserWithUsername(username)
  if (!user) { return null }
  const loginSuccess = await bcrypt.compare(password, user.password_hash)
  if (!loginSuccess) { return null }
  return user
}

const getUserWithUsername = async (username) => {
  let user = await db.selectOne({tableName: "users", keys: ["name"], values: [username]})
  if (user === null) {
    console.error("dat user doesnt exist")
    return null
  } else {
    return user
  }
}

module.exports = {createNewUser, attemptLogin}