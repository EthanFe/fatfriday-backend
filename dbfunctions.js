const {db} = require('./db-direct-postgres.js')
const {catchAsync} = require('./utility.js')

const functions = {
  // insert("events", ["created_by", "name", "event_date", "created_on"], [0, "some dude", new Date().getTime() / 1000, new Date().getTime() / 1000], [null, null, "to_timestamp", "to_timestamp"])
  insert: async ({tableName, columns, values, modifiers = []}) => {
    const valuesString = functions.stringifyArray(values.map((value, index) => {
      return modifiers[index] ? modifiers[index] + "($" + (index + 1) + ")" : "$" + (index + 1)
    }))
    const query = `INSERT INTO ${tableName} ${functions.stringifyArray(columns)} VALUES${valuesString};`
    return catchAsync(db.none(query, values))
  },

  stringifyArray: (columns) => {
    return `(${columns.join(", ")})`
  },

  selectOne: async ({tableName, keys = [], values = []}) => {
    let query = `SELECT * FROM ${tableName}`
    if (keys.length > 0) {
      query += " WHERE " + keys.map((key, index) => `${key}=$${index + 1}`).join(" AND ")
    }
    let [error, result] = await catchAsync(db.one(query, values))
    if (error) {
      console.error('Error in db selectOne:', error)
    }
    return result
  },

  selectMultiple: async ({tableName, keys = [], values = []}) => {
    let query = `SELECT * FROM ${tableName}`
    if (keys.length > 0) {
      query += " WHERE " + keys.map((key, index) => `${key}=$${index + 1}`).join(" AND ")
    }
    let [error, result] = await catchAsync(db.many(query, values))
    if (error) {
      console.error('Error in db selectMultiple:', error)
    }
    return result || []
  },

  update: async ({tableName, conditions = [], valuesToSet = []}) => {
    let query = `UPDATE ${tableName} SET `

    query += valuesToSet.map((column, index) => {
      return `${column.name} = $${index + 1}`
    }).join(", ")

    query += ' WHERE '

    query += conditions.map((condition, index) => {
      return `${condition.name}=$${valuesToSet.length + index + 1}`
    }).join(" AND ")
    return catchAsync(db.none(query, valuesToSet.map(column => column.value).concat(conditions.map(condition => condition.value))))
  },

  remove: async ({tableName, conditions = []}) => {
    let query = `DELETE FROM ${tableName} WHERE `

    query += conditions.map((condition, index) => {
      return `${condition.name}=$${index + 1}`
    }).join(" AND ")
    return catchAsync(db.one(query, conditions.map(condition => condition.value)))
  },
}

module.exports = { db: functions }