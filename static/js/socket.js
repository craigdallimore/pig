///////////////////////////////////////////////////////////////////////////////
//
// Socket
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

// Socketio
var io = require('socket.io-client');
var ss = require('socket.io-stream');

///////////////////////////////////////////////////////////////////////////////

var socket = io.connect(location.href);

function uploadFiles(FileList) {

  Array.prototype.forEach.call(FileList, function streamFile(file) {

    var stream = ss.createStream();

    ss(socket).emit('file:upload', stream, {
      name : file.name,
      size : file.size,
      type : file.type.split('/')[0]
    });

    var blobReadStream = ss.createBlobReadStream(file);
    var size = 0;

    blobReadStream.on('data', function(chunk) {
      size += chunk.length;
      console.log(Math.floor(size / file.size * 100) + '%');
    });

    blobReadStream.pipe(stream);

  });

}

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = {

  socket      : socket,
  ss          : ss,
  uploadFiles : uploadFiles

};
