///////////////////////////////////////////////////////////////////////////////
//
// MediaLists component
//
// Represents a group of media lists
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

const { Flux } = require('delorean');
const React    = require('react/addons');
let   DOM      = React.DOM;

//// COMPONENT ////////////////////////////////////////////////////////////////

let MediaList = require('./media-list.jsx');

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
