const {db} = require('./db-direct-postgres.js')
const {catchAsync} = require('./utility.js')

// insert("events", ["created_by", "name", "event_date", "created_on"], [0, "some dude", new Date().getTime() / 1000, new Date().getTime() / 1000], [null, null, "to_timestamp", "to_timestamp"])
const insert = async ({tableName, columns, values, modifiers = []}) => {
  const valuesString = stringifyArray(values.map((value, index) => {
    return modifiers[index] ? modifiers[index] + "($" + (index + 1) + ")" : "$" + (index + 1)
  }))
  const query = `INSERT INTO ${tableName} ${stringifyArray(columns)} VALUES${valuesString};`
  return catchAsync(db.none(query, values))
}

const stringifyArray = (columns) => {
  return `(${columns.join(", ")})`
}

const selectOne = async ({tableName, keys = [], values = []}) => {
  let query = `SELECT * FROM ${tableName}`
  if (keys.length > 0) {
    query += " WHERE " + keys.map((key, index) => `${key}=$${index + 1}`)
  }
  let [error, user] = await catchAsync(db.one(query, values))
  if (error) {
    console.error('Error in db selectOne:', error)
  }
  return user
}

const selectMultiple = async ({tableName, keys = [], values = []}) => {
  let query = `SELECT * FROM ${tableName}`
  if (keys.length > 0) {
    query += " WHERE " + keys.map((key, index) => `${key}=$${index + 1}`)
  }
  let [error, user] = await catchAsync(db.many(query, values))
  if (error) {
    console.error('Error in db selectMultiple:', error)
  }
  return user || []
}

module.exports = { insert, selectOne, selectMultiple }