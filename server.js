const express = require('express');
const apiRouter = require('./api/api-router');
const configureMiddleware = require('./api/configure-middleware')

const server = express();

server.use(express.json());

configureMiddleware(server);

server.use('/api', apiRouter)


server.listen(6000, () => console.log(`*** Server listening on port: 6000 ***`))