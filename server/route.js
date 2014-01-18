var fs  = require('fs'),
  _     = require('lodash'),

  library = process.env.NODE_ENV === 'development' ?
    '/media/decoy/SDCARD/media/' :
    '/home/pi/ext/';

// Get directory list
// ----------------------------------------------------------------------------

function getDirList(type, callback) {

  fs.readdir(library + type + '/', function(err, files) {
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

module.exports = function(App, io) {

  io.sockets.on('connection', function(socket) {

    inform('video', socket);
    inform('image', socket);
    inform('audio', socket);

    App.on('file:saved', function(file) {
      socket.emit('file:saved', file);
    });

  });

  function saveFile (name, file) {

    var type     = file.headers['content-type'].split('/')[0],
        destPath = library + type + '/' + name,
        is       = fs.createReadStream(file.path),
        os       = fs.createWriteStream(destPath);

    is.on('end', function() {

      console.log('on end');

      App.emit('file:saved', {
        name: name,
        type: type,
        path: '/files/' + type + '/' + name
      });

      fs.unlinkSync(file.path);
    });

    is.pipe(os);

  }



  // All the actual routing stuff here :/

  return {

    index: function(req, res) {
      res.render('index', {
        title: req.get('host')
      });
    },

    onUploadStart: function(req, res, next) {

      for (var fileName in req.files) {
        saveFile(fileName, req.files[fileName]);
      }

      next();

    },

    onUploadComplete: function(req, res) {
      res.send({ received: true });
    },

    // API methods
    // --------------------------------------------------------------------------
    api: {

      getPath: function(req, res) {

        var itemType = req.params.type;

        getDirList(itemType + '/', function(list) {
          res.send(list);
        });

      },

      removeItem: function(req, res) {

        var itemType = req.params.type,
          name       = req.params.name,
          path       = library + itemType + '/' + name;

        fs.unlink(path, function(err) {
          if (err) return res.json({ deleted: false, error: 'File not found' });
          res.json({ deleted: true });
        });


      }
    }

  };

};
