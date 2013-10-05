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
    }

  };

};

function saveFile (fileName, file) {

  var contentType = file.headers['content-type'].split('/')[0];
  console.log('contentType', contentType);


  fs.readFile(file.path, function(err, data) {
    if (err) throw err;

    var newPath = __dirname + '/../uploads/' + contentType + '/' + fileName;

    console.log('oldPath', file.path);
    console.log('newPath', newPath);

    fs.rename(file.path, newPath, function(err) {
      if (err) throw err;
    });

  });

}

