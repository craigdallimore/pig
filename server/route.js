var fs = require('fs'),
    ss = require('socket.io-stream'),
    _  = require('lodash'),
    path = require('path'),

    library = process.env.NODE_ENV === 'development' ?
    '/home/decoy/dev-local/pig/library/' :
    '/home/pi/ext/';

// Get directory list
// ----------------------------------------------------------------------------

function getDirList(type, callback) {

  var dir = library + type + '/';

  fs.readdir(dir, function(err, files) {
    if (err) throw err;

    callback(_.map(files, function(name) {

      return {
        name: name,
        type: type,
        path: '/files/' + type + '/' + name
      };

    }));

  });
}

function inform(type, socket) {

    getDirList(type, function(list) {
      socket.emit('list:' + type, list);
    });

}

module.exports = function(app, io) {

  io.sockets.on('connection', function(socket) {

    inform('video', socket);
    inform('image', socket);
    inform('audio', socket);

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

  });

  // Routes
  // --------------------------------------------------------------------------

  app.get('/',                  getIndex);
  app.get('/files/:type/:name', getFile);

  app.post('/api/item/:type/:name',   postNameChange);
  app.delete('/api/item/:type/:name', removeItem);

  function getIndex(req, res) {

    res.render('index.jade', {
      title: req.get('host')
    });

  }

  function getFile(req, res) {

    var file = library + req.params.type + '/' + req.params.name;
    fs.createReadStream(file).pipe(res);

  }

  // API methods
  // --------------------------------------------------------------------------

  function postNameChange(req, res) {

    var itemType = req.params.type,
      oldName    = library + itemType + '/' + req.body.name,
      newName    = library + itemType + '/' + req.body.newName;

    fs.rename(oldName, newName, function(err) {
      if (err) return res.json({ renamed: false });

      res.json({ renamed: true });

    });

  }

  function removeItem(req, res) {

    var itemType = req.params.type,
      name       = req.params.name,
      path       = library + itemType + '/' + name;

    fs.unlink(path, function(err) {
      if (err) return res.json({ deleted: false, error: 'File not found' });
      res.json({ deleted: true });
    });


  }

};
