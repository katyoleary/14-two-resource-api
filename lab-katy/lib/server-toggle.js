'use strict';

const debug = require('debug')('weed:server-toggle');
const mongoose = require('mongoose');

module.exports = exports = {};

exports.serverOn = function(server, done) {
  if(!server.isRunning) {
    server.listen(process.env.PORT, () => { ///may need to change server to 3000
      server.isRunning = true;
      debug('server up!');
      done();
    });
    return;
  }
  done();
};

exports.serverOff = function(server, done) {
  if (server.isRunning) {
    server.close( err => {
      if (err) return done(err);
      server.isRunning = false;
      mongoose.connection.close();
      debug('server down!');
      done();
    });
    return;
  }
  done();
};

