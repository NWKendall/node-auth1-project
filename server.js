const express = require('express');
const apiRouter = require('./api/api-router');
const configureMiddleware = require('./api/configure-middleware')

const server = express();

configureMiddleware(server);

server.use(express.json());

server.use('/api', apiRouter)



server.listen(6000, () => console.log(`*** Server listening on port: 6000 ***`))