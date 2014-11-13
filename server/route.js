var fs = require('fs'),
    ss = require('socket.io-stream'),
    _  = require('lodash'),

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

// Routes

module.exports = function(app, io) {

  io.sockets.on('connection', function(socket) {

    inform('video', socket);
    inform('image', socket);
    inform('audio', socket);

    app.on('file:saved', function(file) {

      socket.emit('file:saved', file);

    });

  });

  function saveFile (name, file) {

    var type     = file.headers['content-type'].split('/')[0],
        destPath = library + type + '/' + name,
        is       = fs.createReadStream(file.path),
        os       = fs.createWriteStream(destPath);

    is.on('end', function() {

      app.emit('file:saved', {
        name: name,
        type: type,
        path: '/files/' + type + '/' + name
      });

      fs.unlinkSync(file.path);
    });

    is.pipe(os);

  }

  // Routes
  // --------------------------------------------------------------------------

  app.get('/',                  getIndex);
  app.get('/files/:type/:name', getFile);
  app.post('/uploads',          onUploadStart, onUploadComplete);

  app.post('/api/item/:type/:name',   postNameChange);
  app.get('/api/item/:type',          getPath);
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

  function onUploadStart(req, res, next) {

    for (var fileName in req.files) {
      saveFile(fileName, req.files[fileName]);
    }

    next();

  }

  function onUploadComplete(req, res) {

    res.send({ received: true });

  }

  // API methods
  // --------------------------------------------------------------------------

  function getPath(req, res) {

    var itemType = req.params.type;

    getDirList(itemType + '/', function(list) {
      res.send(list);
    });

  }

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
