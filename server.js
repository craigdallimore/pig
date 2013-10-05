var express = require('express'),
    App     = express(),
    server  = require('http').createServer(App),
    routes  = require('./server/route')(App);

// Using jade templating
App.set('views', __dirname + '/static/jade');
App.set('view engine', 'jade');

// Log incoming requests to the console
App.use(express.logger('dev'));



// Connect configuration
App.configure(function() {
  App.use(express.bodyParser({
    keepExtensions: true,
    uploadDir: __dirname + '/uploads' }));
  App.use('./static', express.static(__dirname + './static'));
  App.use(express.static(__dirname));
});

// Routes
App.get('/',         routes.index);
App.post('/uploads', routes.onUploadStart, routes.onUploadComplete);

// Start server
if (!module.parent) {
  server.listen(process.env.VCAP_APP_PORT || 3000);
  console.log("Listening on port %d", server.address().port);
}
