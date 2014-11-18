var fs = require('fs'),
    ss = require('socket.io-stream'),
    _  = require('lodash'),
    path = require('path'),
    Promise = require('bluebird'),

    library = process.env.NODE_ENV === 'development' ?
    '/home/decoy/dev-local/pig/library/' :
    '/home/pi/ext/';

// Use bluebird to upgrade fs to a promise library
Promise.promisifyAll(fs);

// Get directory list
// ----------------------------------------------------------------------------

function emitList(type, socket) {

  var dir = library + type + '/';

  fs.readdirAsync(dir).then(function(files) {

    var fileList = files.map(function(name) {

      return {
        name: name,
        type: type,
        path: '/files/' + type + '/' + name
      };

    });

    socket.emit('list:' + type, fileList);

  });

}

module.exports = function(app, io) {

  io.sockets.on('connection', function(socket) {

    emitList('video', socket);
    emitList('image', socket);
    emitList('audio', socket);

    // File uploads are streamed. Once the stream completes, an event is
    // emitted to inform the client that the new file has been saved.
    // ------------------------------------------------------------------------
    ss(socket).on('file:upload', function(stream, data) {

      var name = path.basename(data.name);
      var type = data.type;

      stream.pipe(fs.createWriteStream(library + type + '/' + name));

      stream.on('end', function() {

        socket.emit('file:saved', {
          name: name,
          type: type,
          path: '/files/' + type + '/' + name
        });

      });

    });

    // File renaming
    // ------------------------------------------------------------------------
    socket.on('file:rename', function(item, newName) {

      var oldPath = library + item.type + '/' + item.name,
        newPath   = library + item.type + '/' + newName;

      fs.renameAsync(oldPath, newPath).then(function() {
        console.log('Renamed ' + item.name + ' to ' + newName);
        socket.emit('file:renamed', item, newName);
      }, function() {
        console.log('Error renaming ' + item.name + ' to ' + newName);
      });

    });

    // File deleting
    // ------------------------------------------------------------------------
    socket.on('file:remove', function(item) {

      var path = library + item.type + '/' + item.name;

      fs.unlinkAsync(path).then(function() {
        console.log('deleted', item);
        socket.emit('file:removed', item);
      }, function() {
        console.log('Error deleting ' + item.name);
      });

    });

  });

  // Routes
  // --------------------------------------------------------------------------
  function getIndex(req, res) {

    res.render('index.jade', {
      title: req.get('host')
    });

  }

  function getFile(req, res) {

    var file = library + req.params.type + '/' + req.params.name;
    fs.createReadStream(file).pipe(res);

  }

  app.get('/',                  getIndex);
  app.get('/files/:type/:name', getFile);

};
