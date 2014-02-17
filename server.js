// Set up
// ----------------------------------------------------------------------------
var express = require('express'),
  app       = express(),
  server    = require('http').createServer(app),
  io        = require('socket.io').listen(server),
  port      = process.env.PORT || 3000;

// Configuration
// ----------------------------------------------------------------------------
app.configure(function() {

  app.set('views', __dirname + '/server/views/');
  app.use('view engine', 'jade');

  app.use('./static', express.static(__dirname + './static'));
  app.use(express.static(__dirname));

  app.use(express.bodyParser({
    keepExtensions: true,
    limit: 4100000000,
    uploadDir: __dirname + '/uploads'
  }));


  app.use(express.logger('dev'));

});

// Routes
// ----------------------------------------------------------------------------
require('./server/route')(app, io);


// Launch
// ----------------------------------------------------------------------------
app.listen(port);
console.log('Node server listening on port ' + port);
