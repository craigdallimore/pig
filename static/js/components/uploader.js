///////////////////////////////////////////////////////////////////////////////
//
// Uploader
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

const React = require('react');
const DOM   = React.DOM;

//// FLUX /////////////////////////////////////////////////////////////////////

let { uploadFiles } = require('../actions/server');

//// COMPONENT ////////////////////////////////////////////////////////////////

let Uploader = React.createClass({

  getInitialState() {

    return { hover : false };

  },

  _onDragEnter() {

    this.setState({ hover : true });

  },

  _onDragOver(e) {

    e.preventDefault();

  },

  _onDragLeave() {

    this.setState({ hover : false });

  },

  _onDrop(e) {

    this.setState({ hover : false });
    this.fileSelectHandler(e);

  },

  render() {

    let hoverClass = this.state.hover ? ' hover' : '';
    let className  = 'drop-zone' + hoverClass;

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

  fileSelectHandler(e) {

    let event = e.originalEvent ? e.originalEvent : e;
    let files = event.target.files || event.dataTransfer.files;

    event.preventDefault();

    if (!files) { return; }

    uploadFiles(files);

  }

});

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = React.createFactory(Uploader);

///////////////////////////////////////////////////////////////////////////////
