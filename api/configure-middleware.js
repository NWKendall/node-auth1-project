const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig))
};

// server.get('/', (req, res) => {
//   res.json({ api: 'UP'})
// })

const sessionConfig = { 
  name: 'monkey', // sid
  secret: 'TESTING!',
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in production
    httpOnly: true,
  },
  resave: false,
  saveUnitialized: false, // GDPR compliance - only true once user has opted in, true can't be default
}