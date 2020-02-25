const bcrypt = require('bcryptjs');
const userData = require('../users/user-model')


module.exports = (req, res, next) => {
  let { username, password } = req.headers;

  if(username && password) {
    userData
    .getUserLogin({ username })
    .first()
    .then(newUser => {
      if(newUser && bcrypt.compareSync(password, newUser.password)){
        next();        
      } else {
        res.status(401).json({ error: 'Invalid Credentials'})
      }
    })
    .catch(({ name, message, stack }) => {
      res.status(500).json({ name, message, stack })
    })
  } else {
    res.status(400).json({ error: "Please provide credentials!" })
  }
}
