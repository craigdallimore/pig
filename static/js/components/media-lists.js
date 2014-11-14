///////////////////////////////////////////////////////////////////////////////
//
// MediaLists component
//
// Represents a group of media lists
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

const React      = require('react');
let   DOM        = React.DOM;
let   { socket } = require('../socket');

//// COMPONENT ////////////////////////////////////////////////////////////////

let MediaList = require('./media-list');

let store = require('../store/file-store');

let mediaLists = React.createClass({

  _updateList : function updateList(type, list) {
    type.children = list;
    this.setProps(this.props);
  },

  componentDidMount : function componentDidMount() {

    var component = this;

    socket.on('list:video', function updateVideoList(list) {
      component._updateList(component.props.types.video, list);
    });

    socket.on('list:image', function updateImageList(list) {
      component._updateList(component.props.types.image, list);
    });

    socket.on('list:audio', function updateAudioList(list) {
      component._updateList(component.props.types.audio, list);
    });

    socket.on('file:saved', function onFileSaved(file) {
      console.log('file:saved', file);
    });

  },

  render : function render() {

    return DOM.ul({ className : 'media-lists' },
      MediaList(this.props.types.video),
      MediaList(this.props.types.image),
      MediaList(this.props.types.audio)
    );

  }

});

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = React.createFactory(mediaLists);


