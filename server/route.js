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
    console.log('readfile');
    if (err) throw err;

    var newPath = '/home/pi/ext/' + contentType + '/' + fileName;

    console.log('oldPath', file.path);
    console.log('newPath', newPath);
    fs.stat(file.path, function(err, stats) {
      console.log('old path stats', stats);
      var permString = '0' + (stats.mode & 0777).toString(8);
      console.log('permstring', permString);
    });


    //fs.stat('/home/pi/ext' + contentType, function(err, stats) {
      //console.log('new path stats', stats);
      //var permString = '0' + (stats.mode & 0777).toString(8);
      //console.log('permstring', permString);
    //});

    fs.rename(file.path, newPath, function(err) {
      console.log('rename');
      if (err) throw err;
    });

  });

}

