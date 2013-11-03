var express = require('express'),
    App     = express(),
    server  = require('http').createServer(App),
    io      = require('socket.io').listen(server),
    routes  = require('./server/route')(App, io),

    paths   = process.env.NODE_ENV === 'development' ?
      { library: '/home/decoy/SDCARD/media/' } :
      { library: '/home/pi/ext/' };

// Using jade templating
App.set('views', __dirname + '/static/jade');
App.set('view engine', 'jade');

// Log incoming requests to the console
App.use(express.logger('dev'));



// Connect configuration
App.configure(function() {
  App.use(express.bodyParser({
    keepExtensions: true,
    limit: 4100000000,
    uploadDir: __dirname + '/uploads'
  }));
  App.use('./static', express.static(__dirname + './static'));
  App.use('/files', express.static(paths.library));
  App.use(express.static(__dirname));
});

// Routes
App.get('/',                        routes.index);
App.post('/uploads',                routes.onUploadStart, routes.onUploadComplete);
App.get('/api/item/:type',          routes.api.getPath);
App.delete('/api/item/:type/:name', routes.api.removeItem);


// Start server
if (!module.parent) {
  server.listen(process.env.VCAP_APP_PORT || 3000);
  console.log("Listening on port %d", server.address().port);
}

