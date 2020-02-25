const router = require('express').Router();

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/user-router');
const restricted = require('../auth/restricted-middleware')


router.use('/auth', authRouter);
router.use('/users', restricted, usersRouter);

router.get('/', (req, res) => {
  res.json({ api: "api called"})
})

module.exports = router;