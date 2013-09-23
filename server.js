var express = require('express'),
    App     = express(),
    server  = require('http').createServer(App);

// Using jade templating
App.set('views', __dirname + '/static/jade');
App.set('view engine', 'jade');

// Log incoming requests to the console
App.use(express.logger('dev'));


// Connect configuration
App.configure(function() {
  App.use('./static', express.static(__dirname + './static'));
  App.use(express.static(__dirname));
});

App.get('/', function(req, res) {
  res.render('index', {
    title: req.get('host')
  });
});





// Start server
if (!module.parent) {
  server.listen(process.env.VCAP_APP_PORT || 3000);
  console.log("Listening on port %d", server.address().port);
}


