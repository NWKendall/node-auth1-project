const db = require('../data/db-config');

module.exports = {
  getUsers,
  addUser,
  getUserLogin,
  getUserId
}


function getUsers() {
  return db('users').select('id', 'username', 'password')
}

function getUserLogin(filter) {
  return db('users')
    .select('id', 'username', 'password') // login functions MUST include password for authentication
    .where(filter);
}

function getUserId(id) {  
    return db('users')
      .select('id', 'username')
      .where({ id })
      .first();
  }

function addUser(user){
    return db('users')
      .insert(user, 'id')
      .then(ids => {
        const [id] = ids;
        return getUserId(id)
      })

}