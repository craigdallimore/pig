///////////////////////////////////////////////////////////////////////////////
//
// Actions
//
///////////////////////////////////////////////////////////////////////////////

// Socketio
let io     = require('socket.io-client');
let ss     = require('socket.io-stream');
let socket = require('../socket');

//// LIBS /////////////////////////////////////////////////////////////////////

let Dispatcher = require('../dispatcher/dispatcher');

//// ACTIONS //////////////////////////////////////////////////////////////////

let Actions = {

  removeItem(item) {

    let { name, type } = item;
    let xhr            = new XMLHttpRequest();

    xhr.onreadystatechange = (e) => {

      let { readyState } = xhr;

      if ( readyState !== 4 ) return;

      if ( xhr.status !== 200 ) {
        throw('error deleting ' + name);
      }

      // It worked
      Dispatcher.removeItem(item);

    };

    xhr.open('DELETE', '/api/item/' + type + '/' + name);
    xhr.send();

  },

  uploadFiles(FileList) {

    Array.prototype.forEach.call(FileList, streamFile);

  },

  progressUpload(item) {

    Dispatcher.progressUpload(item);

  }

};

let streamFile = (file) => {

  let stream = ss.createStream();
  let item   = {
    name : file.name,
    size : file.size,
    type : file.type.split('/')[0]
  }

  // Inform the server that a stream is coming.
  ss(socket).emit('file:upload', stream, item);

  let blobReadStream = ss.createBlobReadStream(file);
  let size = 0;

  // Inform the store of the percentage uploaded.
  blobReadStream.on('data', (chunk) => {

    size += chunk.length;

    item.percentage = Math.floor(size / file.size * 100);

    // Create an action for each uploaded chuck so
    // the store can reflect progress.
    Actions.progressUpload(item);

  });

  blobReadStream.pipe(stream);

};

///// EXPORTS /////////////////////////////////////////////////////////////////

module.exports = Actions;

///////////////////////////////////////////////////////////////////////////////
