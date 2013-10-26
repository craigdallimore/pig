var fs = require('fs');

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

    api: {
      getPath: function(req, res) {

        var itemType = req.params.type;
        console.log('itemType', itemType);
        var path = '/home/pi/ext/' + itemType + '/';

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
      }
    }

  };

};

function saveFile (fileName, file) {

  var contentType = file.headers['content-type'].split('/')[0];
  var destPath = '/home/pi/ext/' + contentType + '/' + fileName;

  console.log('contentType', contentType);
  console.log('temp path', file.path);
  console.log('dest path', destPath);

  var is = fs.createReadStream(file.path);
  var os = fs.createWriteStream(destPath);

  is.pipe(os);
  is.on('end', function() {
    console.log('on end');
    fs.unlinkSync(file.path);
  });

}

