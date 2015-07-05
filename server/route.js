///////////////////////////////////////////////////////////////////////////////
//
// Routes, etc
//
///////////////////////////////////////////////////////////////////////////////

let fs               = require('fs');
let ss               = require('socket.io-stream');
let path             = require('path');
let { promisifyAll } = require('bluebird');
let config           = require('../config.json');

// Use bluebird to upgrade fs to a promise library
promisifyAll(fs);

console.log(config.library);

// Get directory list
// ----------------------------------------------------------------------------

function emitList(type, socket) {

  let dir = `${config.library}/${type}/`;

  fs.readdirAsync(dir).then(files => {

    let fileList = files.map(name => {

      let path = `/files/${type}/${name}`;

      return { name, type, path };

    });

    socket.emit('list:' + type, fileList);

  });

}

module.exports = (app, io) => {

  io.sockets.on('connection', socket => {

    emitList('video', socket);
    emitList('image', socket);
    emitList('audio', socket);

    // File uploads are streamed. Once the stream completes, an event is
    // emitted to inform the client that the new file has been saved.
    // ------------------------------------------------------------------------
    ss(socket).on('file:upload', (stream, data) => {

      let name = path.basename(data.name);
      let type = data.type;
      let uploadPath = `${config.library}/${type}/${name}`;

      stream.pipe(fs.createWriteStream(uploadPath));

      stream.on('end', () => {

        socket.emit('file:saved', {
          name,
          type,
          path: `/files/${type}/${name}`
        });

      });

    });

    // File renaming
    // ------------------------------------------------------------------------
    socket.on('file:rename', (item, newName) => {

      let oldPath = `${config.library}/${item.type}/${item.name}`;
      let newPath = `${config.library}/${item.type}/${newName}`;

      fs.renameAsync(oldPath, newPath)
        .then(() => {
          console.log('Renamed ' + item.name + ' to ' + newName);
          socket.emit('file:renamed', item, newName);
        }).
        catch(() => {
          console.log('Error renaming ' + item.name + ' to ' + newName);
        });

    });

    // File deleting
    // ------------------------------------------------------------------------
    socket.on('file:remove', item => {

      let path = `${config.library}/${item.type}/${item.name}`;

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

    let file = `${config.library}/${req.params.type}/${req.params.name}`;
    fs.createReadStream(file).pipe(res);

  }

  app.get('/',                  getIndex);
  app.get('/files/:type/:name', getFile);

};
