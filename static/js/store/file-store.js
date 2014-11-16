///////////////////////////////////////////////////////////////////////////////
//
// File store
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

const { Flux }            = require('delorean');
const socket              = require('../socket');
let   { find, findIndex, remove } = require('ramda');

//// HELPER ///////////////////////////////////////////////////////////////////

let findItem = (item, collections) => {

  let { name, type } = item;
  let collection     = collections[type];

  return find(x => x.name === name, collection);

};


let Store = Flux.createStore({

  actions : {

    'removeItem'     : 'removeItem',
    'progressUpload' : 'progressUpload',
    'renameItem'     : 'renameItem'

  },

  types : {

    video : [],
    image : [],
    audio : []

  },

  lists : {

    video: { key : 'video-list' , name : 'Videos' , type : 'video' },
    image: { key : 'image-list' , name : 'Images' , type : 'image' },
    audio: { key : 'audio-list' , name : 'Audio'  , type : 'audio' }

  },

  initialize() {

    socket.on('list:video', (items) => this.updateMediaList(items, 'video'));
    socket.on('list:image', (items) => this.updateMediaList(items, 'image'));
    socket.on('list:audio', (items) => this.updateMediaList(items, 'audio'));
    socket.on('file:saved', this.completeUpload.bind(this));

  },

  updateMediaList(items, type) {

    this.types[type] = items;
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

  removeItem(payload) {

    let { name, type } = payload;
    let collection     = this.types[type];
    let index          = findIndex(x => x.name === name, collection);

    this.updateMediaList(remove(index, 1, collection), type);

  },

  getState() {

    return {
      lists : this.lists,
      types : this.types
    };

  }

});

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = new Store();

///////////////////////////////////////////////////////////////////////////////
