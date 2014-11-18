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

  filterFiles(term) {

    Dispatcher.filterFiles(term);

  },

  hideDialog() {

    Dispatcher.hideDialog();

  },

  renameItem(item, newName) {

    Dispatcher.renameItem(item, newName);

  },

  confirmRemoveItem(item) {

    Dispatcher.confirmRemoveItem(item);

  },

  removeItem(item) {

    Dispatcher.removeItem(item);

  },

  progressUpload(item) {

    Dispatcher.progressUpload(item);

  },

  updateMediaList(items, type) {

    Dispatcher.updateMediaList(items, type);

  },

  completeUpload(item) {

    Dispatcher.completeUpload(item);

  }

};

///////////////////////////////////////////////////////////////////////////////

// Re-entry point for actions that extend the flux loop to the server.

socket.on('file:renamed', Actions.renameItem);
socket.on('file:removed', Actions.removeItem);
socket.on('file:saved', Actions.completeUpload);

socket.on('list:video', (items) => Actions.updateMediaList(items, 'video'));
socket.on('list:image', (items) => Actions.updateMediaList(items, 'image'));
socket.on('list:audio', (items) => Actions.updateMediaList(items, 'audio'));


//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = Actions;

///////////////////////////////////////////////////////////////////////////////
