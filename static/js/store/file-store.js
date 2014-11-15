///////////////////////////////////////////////////////////////////////////////
//
// File store
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

const { Flux }   = require('delorean');
let   { socket } = require('../socket');

///////////////////////////////////////////////////////////////////////////////

let Store = Flux.createStore({

  actions : {

    'removeItem' : 'removeItem'

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

  },

  updateMediaList(items, type) {

    this.types[type] = items;
    this.emit('change');

  },

  removeItem(payload) {

    console.log('store:remove', payload);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = (e) => {
      let { readyState } = xhr;
      if ( readyState !== 4 ) { return; }
      if ( xhr.status !== 200 ) { console.log('error deleting'); }
      console.log('deleted');
    };

    xhr.open('DELETE', '/api/item/' + payload.type + '/' + payload.name);
    xhr.send();

    var type = payload.type;

    this.emit('change');

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
