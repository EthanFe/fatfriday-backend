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
  let [error, result] = await catchAsync(db.one(query, values))
  if (error) {
    console.error('Error in db selectOne:', error)
  }
  return result
}

const selectMultiple = async ({tableName, keys = [], values = []}) => {
  let query = `SELECT * FROM ${tableName}`
  if (keys.length > 0) {
    query += " WHERE " + keys.map((key, index) => `${key}=$${index + 1}`)
  }
  let [error, result] = await catchAsync(db.many(query, values))
  if (error) {
    console.error('Error in db selectMultiple:', error)
  }
  return result || []
}

const update = async ({tableName, conditions = [], valuesToSet = []}) => {
  let query = `UPDATE ${tableName} SET `

  query += valuesToSet.map((column, index) => {
    return `${column.name} = $${index + 1}`
  }).join(", ")

  query += ' WHERE '

  query += conditions.map((condition, index) => {
    return `${condition.name}=$${valuesToSet.length + index + 1}`
  }).join(" AND ")
  return catchAsync(db.none(query, valuesToSet.map(column => column.value).concat(conditions.map(condition => condition.value))))
}

module.exports = { insert, selectOne, selectMultiple, update }