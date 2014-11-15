///////////////////////////////////////////////////////////////////////////////
//
// Actions
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

let Dispatcher = require('../dispatcher/dispatcher');

let Actions = {

  removeItem(item) {
    Dispatcher.removeItem(item);
  }

};

///// EXPORTS /////////////////////////////////////////////////////////////////

module.exports = Actions;

///////////////////////////////////////////////////////////////////////////////
