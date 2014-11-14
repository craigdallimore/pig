///////////////////////////////////////////////////////////////////////////////
//
// MediaLists component
//
// Represents a group of media lists
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

var React  = require('react');
var DOM    = React.DOM;
var socket = require('../socket').socket;

//// COMPONENT ////////////////////////////////////////////////////////////////

var MediaList = require('./media-list');

var mediaLists = React.createClass({

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


