///////////////////////////////////////////////////////////////////////////////
//
// File store
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

const { Flux }                    = require('delorean');
let   { find, findIndex, remove } = require('ramda');

//// HELPER ///////////////////////////////////////////////////////////////////

let findItem = (item, collections) => {

  let { name, type } = item;
  let collection     = collections[type];

  return find(x => x.name === name, collection);

};


let Store = Flux.createStore({

  actions : {

    'confirmRemoveItem' : 'confirmRemoveItem',
    'removeItem'        : 'removeItem',
    'progressUpload'    : 'progressUpload',
    'renameItem'        : 'renameItem',
    'filterFiles'       : 'filterFiles',
    'updateMediaList'   : 'updateMediaList',
    'completeUpload'    : 'completeUpload',
    'hideDialog'        : 'hideDialog'

  },

  types : {

    video : [],
    image : [],
    audio : []

  },

  selectedItem : null,

  filterTerm : '',

  dialog : {
    visible : false,
    message : ''
  },

  lists : {

    video: { key : 'video-list' , name : 'Videos' , type : 'video' },
    image: { key : 'image-list' , name : 'Images' , type : 'image' },
    audio: { key : 'audio-list' , name : 'Audio'  , type : 'audio' }

  },

  confirmRemoveItem(item) {

    let message  = 'Do you want to delete ' + item.name + '?';

    this.dialog = {
      message : message,
      visible : true
    };

    this.selectedItem = item;

    this.emit('change');

  },

  hideDialog() {

    this.dialog.visible = false;
    this.emit('change');

  },

  filterFiles(term) {

    this.filterTerm = term;
    this.emit('change');

  },

  updateMediaList(payload) {

    let { type, items } = payload;
    this.types[type]    = items;
    this.emit('change');

  },

  renameItem(payload) {

    let { item, newName } = payload;
    let existingItem      = findItem(item, this.types);
    existingItem.name     = newName;

    this.emit('change');

  },

  progressUpload(item) {

    let { type }   = item;
    let collection = this.types[type];
    let existing   = findItem(item, this.types);

    if (!existing) {
      existing = item;
      collection.push(existing);
    }

    this.emit('change');

  },

  completeUpload(item) {

    let { name, type } = item;
    let collection     = this.types[type];
    let index          = findIndex(x => x.name === name, collection);

    collection[index] = item;

    this.emit('change');

  },

  removeItem(item) {

    let { name, type } = item;
    let collection     = this.types[type];
    let index          = findIndex(x => x.name === name, collection);

    this.updateMediaList({
      items : remove(index, 1, collection),
      type  : type
    });

  },

  getState() {

    return {
      lists        : this.lists,
      types        : this.types,
      filterTerm   : this.filterTerm,
      dialog       : this.dialog,
      selectedItem : this.selectedItem
    };

  }

});

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = new Store();

///////////////////////////////////////////////////////////////////////////////
