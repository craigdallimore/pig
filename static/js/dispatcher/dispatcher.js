///////////////////////////////////////////////////////////////////////////////
//
// Dispatcher
//
///////////////////////////////////////////////////////////////////////////////

//// IMPORTS //////////////////////////////////////////////////////////////////

const { Flux }  = require('delorean');
var   fileStore = require('../store/file-store');

//// FLUX /////////////////////////////////////////////////////////////////////

let Dispatcher = Flux.createDispatcher({

  filterFiles(term) {

    this.dispatch('filterFiles', term);

  },

  confirmRemoveItem(item) {

    this.dispatch('confirmRemoveItem', item);

  },

  removeItem(item) {

    this.dispatch('removeItem', item);

  },

  renameItem(item, newName) {

    this.dispatch('renameItem', {
      item    : item,
      newName : newName
    });

  },

  progressUpload(item) {

    this.dispatch('progressUpload', item);

  },

  completeUpload(item) {

    this.dispatch('completeUpload', item);

  },

  updateMediaList(items, type) {

    this.dispatch('updateMediaList', {
      items : items,
      type  : type
    });

  },

  getStores() {

    return {
      fileStore : fileStore
    };

  }

});

///// EXPORTS /////////////////////////////////////////////////////////////////

module.exports = Dispatcher;

///////////////////////////////////////////////////////////////////////////////
