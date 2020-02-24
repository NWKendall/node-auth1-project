const express = require('express');

const userRouter = require('./data/user-router');

const server = express();

server.use(express.json());

server.use('/api/users', userRouter)



server.listen(6000, () => console.log(`*** Server listening on port: 6000 ***`))