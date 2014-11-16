///////////////////////////////////////////////////////////////////////////////
//
// Server actions
//
// These actions go to the server, extending the Flux loop - the 'client'
// actions are created by the server responses (see /actions/client).
//
///////////////////////////////////////////////////////////////////////////////

//// IMPORTS //////////////////////////////////////////////////////////////////

let socket             = require('../socket');
let ss                 = require('socket.io-stream');
let { progressUpload } = require('./client');

//// HELPER ///////////////////////////////////////////////////////////////////

let streamFile = (file) => {

  let stream = ss.createStream();
  let item   = {
    name : file.name,
    size : file.size,
    type : file.type.split('/')[0]
  };

  // Inform the server that a stream is coming.
  ss(socket).emit('file:upload', stream, item);

  let blobReadStream = ss.createBlobReadStream(file);
  let size = 0;

  // Inform the store of the percentage uploaded.
  blobReadStream.on('data', (chunk) => {

    size += chunk.length;

    item.percentage = Math.floor(size / file.size * 100);

    // Create a client action for each uploaded chuck so
    // the store can reflect progress.
    progressUpload(item);

  });

  blobReadStream.pipe(stream);

};


//// ACTIONS //////////////////////////////////////////////////////////////////

let ServerActions = {

  uploadFiles(FileList) {

    Array.prototype.forEach.call(FileList, streamFile);

  },

  renameItem(item, newName) {

    socket.emit('rename', item, newName);

  },

  removeItem(item) {

    socket.emit('remove', item);

  }

};

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = ServerActions;

///////////////////////////////////////////////////////////////////////////////
