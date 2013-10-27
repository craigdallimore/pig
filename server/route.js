var fs = require('fs'),
    paths = process.env.NODE_ENV === 'development' ? {
  library: '/media/decoy/SDCARD/media/'
} : {
  library: '/home/pi/ext/'
};

module.exports = function(App) {

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

        var itemType = req.params.type,
          path       = paths.library + itemType + '/';

        fs.readdir( path, function(err, data) {
          if (err) throw err;

          var json = data.map(function(item) {

            return {
              name: item,
              path: '/files/' + itemType + '/' + item
            };

          }) || [];

          res.send(json);
        });
      },

      removeItem: function(req, res) {

        var itemType = req.params.type,
          name       = req.params.name,
          path       = paths.library + itemType + '/' + name;

        fs.unlink(path, function(err) {
          if (err) throw err;
          res.json({ deleted: true });
        });


      }
    }

  };

};


function saveFile (fileName, file) {

  var contentType = file.headers['content-type'].split('/')[0],
      destPath    = paths.library + contentType + '/' + fileName,
      is          = fs.createReadStream(file.path),
      os          = fs.createWriteStream(destPath);

  is.pipe(os);
  is.on('end', function() {
    console.log('on end');
    fs.unlinkSync(file.path);
  });

}

