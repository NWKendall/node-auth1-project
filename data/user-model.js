const db = require('./db-config');

module.exports = {
  getUsers
}


function getUsers() {
  return db('users')
}