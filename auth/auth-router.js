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
    .getUserLogin({ username })
    .first()
    .then(newUser => {
      if(newUser && bcrypt.compareSync(password, newUser.password)){
        req.session.user = user; // saves user data to session cookie
        res.status(200).json({ message: 'SUCCESS!'});        
      } else {
        res.status(401).json({ error: 'Invalid Credentials'})
      }
    })
    .catch(({name, message, stack}) => {
      res.status(500).json({name, message, stack})
    })
})

router.get('/logout', (req, res) => {
  if(req.session){
    req.session.destroy(err => {
      if(err){
        res.json({ message: "Log out failed"})
      } else {
        res.status(200).json({ message: 'logout successful' })
      }
    })
  } else {
    res.status(200).json({ message: 'no user logged in'})
  }
})





module.exports = router;