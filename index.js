'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port:3000 });
//Defining routes

server.register(require('inert'),
  (err) => {
    if (err) {
      throw err;
    }

    server.route({
      method: 'GET',
      path: '/',
      handler: function (req, resp) {
        resp.file('./public/index.html');
      }
    });
  }
);

//Starting the server
server.start(
  (err) => {
    if (err)
      throw err;

    console.log(`Server running at: ${server.info.uri}`);
  }
);
