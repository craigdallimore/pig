//
// Express 4.0 starter application
// http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0
//
// This starts a node webserver on either port 3000 or a number given
// in the environments PORT variable.
//
// View templates are written in Jade
// http://jade-lang.com/
//
// Routes are imported from server/routes.js
//

// Set up
// ----------------------------------------------------------------------------
var express    = require('express'),
  app          = express(),
  morgan       = require('morgan'),
  compression  = require('compression'),
  errorHandler = require('errorhandler'),
  server       = require('http').Server(app),
  io           = require('socket.io').listen(server),
  env          = process.env.NODE_ENV || 'development',
  port         = process.env.PORT || 3000;

// Configuration
// ----------------------------------------------------------------------------
app.set('views', __dirname + '/server/views/');

var oneYear = 31557600000;

app.use(express.static(__dirname + '/',       { maxAge: oneYear }));
app.use(express.static(__dirname + '/static', { maxAge: oneYear }));

if (env === 'development') {

  app.use(morgan('dev'));
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));

} else {

  app.use(morgan());
  app.use(errorHandler());

}

// Routes
// ----------------------------------------------------------------------------
require('./server/route')(app, io);

// Launch
// ----------------------------------------------------------------------------
server.listen(port);
console.log('Node server listening on port ' + port);
