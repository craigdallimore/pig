///////////////////////////////////////////////////////////////////////////////
//
// Uploader
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

var React       = require('react');
var DOM         = React.DOM;
var uploadFiles = require('../socket').uploadFiles;

//// COMPONENT ////////////////////////////////////////////////////////////////

var uploader = React.createClass({

  getInitialState : function getInitialState() {

    return { hover : false };

  },

  _onDragEnter : function onDragEnter(e) {

    this.setState({ hover : true });

  },

  _onDragOver : function onDragOver(e) {

    e.preventDefault();

  },

  _onDragLeave : function onDragLeave(e) {

    this.setState({ hover : false });

  },

  _onDrop : function onDrop(e) {

    this.setState({ hover : false });
    this.fileSelectHandler(e);

  },

  render : function render() {

    var hoverClass = this.state.hover ? ' hover' : '';
    var className  = 'drop-zone' + hoverClass;

    return DOM.div({

      id          : 'file-drag',
      className   : className,
      onDragEnter : this._onDragEnter,
      onDragOver  : this._onDragOver,
      onDragLeave : this._onDragLeave,
      onDrop      : this._onDrop,
      style       : { 'display' : 'block' }

    }, DOM.p(null, 'Drop files here'));

  },

  fileSelectHandler : function fileSelectHandler(e) {

    var event = e.originalEvent ? e.originalEvent : e;
    var files = event.target.files || event.dataTransfer.files;

    event.preventDefault();

    if (!files) { return; }

    uploadFiles(files);

  }

});

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = React.createFactory(uploader);



