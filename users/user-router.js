const express = require('express');
const userData = require('./user-model');
const router = express.Router();

router.get('/', (req, res) => {

  userData
    .getUsers()
    .then(users => {
      console.log(users)
      if (users) {
        res.status(200).json(users)
      } else {
        res.status(400).json({ message: "No users in database"})
      }    
    })
    .catch(({name, message, stack })=> {
      res.status(500).json({ name, message, stack })
    })
})

// router.get('/:id', (req, res) => {
  
//   const id = req.headers.id;

//   userData
//     .getUserId(id)
//     .then(user => {
//       res.status(200).json(user)
//     })
//     .catch(({name, message, stack}) => {
//       res.status(500).json({ name, message, stack})
//     })
// })

module.exports = router;