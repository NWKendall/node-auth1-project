const bcrypt = require('bcryptjs');

const router = require('express').Router();

const userData = require('../users/user-model')


router.post('/register', (req, res) => {

  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12)

  user.password = hash;

  userData
  .addUser(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(({name, message, stack}) => {
      res.status(500).json({name, message, stack})
    })
})

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  userData
    .getUserBy({ username })
    .first()
    .then(newUser => {
      if(newUser && bcrypt.compareSync(password, newUser.password)){
        res.status(200).json({ message: 'SUCCESS!'});        
      } else {
        res.status(401).json({ error: 'Invalid Credentials'})
      }
    })
    .catch(({name, message, stack}) => {
      res.status(500).json({name, message, stack})
    })
})






module.exports = router;