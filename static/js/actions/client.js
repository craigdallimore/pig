///////////////////////////////////////////////////////////////////////////////
//
// Actions
//
// Client actions go to the dispatcher.
// Client actions can come from the server or from the view.
//
///////////////////////////////////////////////////////////////////////////////

//// IMPORTS //////////////////////////////////////////////////////////////////

let socket     = require('../socket');
let Dispatcher = require('../dispatcher/dispatcher');

//// ACTIONS //////////////////////////////////////////////////////////////////

let Actions = {

  renameItem(item, newName) {

    Dispatcher.renameItem(item, newName);

  },

  removeItem(item) {

    Dispatcher.removeItem(item);

  },

  progressUpload(item) {

    Dispatcher.progressUpload(item);

  }

};

///////////////////////////////////////////////////////////////////////////////

// Re-entry point for actions that extend the flux loop to the server.

socket.on('renamed', Actions.renameItem);
socket.on('deleted', Actions.removeItem);

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = Actions;

///////////////////////////////////////////////////////////////////////////////