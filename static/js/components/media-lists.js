///////////////////////////////////////////////////////////////////////////////
//
// MediaLists component
//
// Represents a group of media lists
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

const { Flux }   = require('delorean');
const React      = require('react');
let   DOM        = React.DOM;
let   { socket } = require('../socket');

//// COMPONENT ////////////////////////////////////////////////////////////////

let MediaList = require('./media-list');

let mediaLists = React.createClass({

  mixins : [ Flux.mixins.storeListener ],

  _updateList(type, list) {

    type.children = list;
    this.setProps(this.props);

  },

  render() {

    let { lists } = this.getStore('fileStore');

    return DOM.ul({ className : 'media-lists' },
      MediaList(lists.video),
      MediaList(lists.image),
      MediaList(lists.audio)
    );

  }

});

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = React.createFactory(mediaLists);

///////////////////////////////////////////////////////////////////////////////
