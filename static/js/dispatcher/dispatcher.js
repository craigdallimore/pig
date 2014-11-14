///////////////////////////////////////////////////////////////////////////////
//
// Dispatcher
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

const { Flux } = require('delorean');
const Store      = require('../store/file-store');

let store = new Store();

console.log(store);

let Dispatcher = Flux.createDispatcher({

  setData(data) {

    console.log('dispatcher: setdata', data);
    this.dispatch('incoming-data', data);

  },

  getStores() {

    return { increment : store };

  }

});

///// EXPORTS /////////////////////////////////////////////////////////////////

module.exports = Dispatcher;

///////////////////////////////////////////////////////////////////////////////