'use strict';

const Hapi = require('hapi');
const chalk = require ('chalk');
const socket = require('./server/socket.js');

const log = console.log;

const server = new Hapi.Server();
server.connection({ port:3000 });
//Defining routes
socket.setup(server.listener);


server.register(require('inert'),
  (err) => {
    if (err) {
      throw err;
    }

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
         path: 'public',
         listing: true,
       },
      }
    });
  }
);

//Starting the server
server.start(
  (err) => {
    if (err)
      throw err;

    log(`${chalk.yellow('Marius server running at:')} ${chalk.green(server.info.uri)}`);
  }
);
