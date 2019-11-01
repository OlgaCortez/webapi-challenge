const express = require('express');
const server = express();
const helmet = require('helmet');

const actionRouter = require('./data/helpers/actionRouter');
const projectRouter = require('./data/helpers/projectRouter');

server.get('/', (req, res) => {
    res.send(`<h1>Week 1 Sprint Challenge</h1>`)
});
server.use(express.json());
server.use('/actions', actionRouter);
server.use('/projects', projectRouter);

module.exports = server;