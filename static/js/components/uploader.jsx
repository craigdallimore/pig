///////////////////////////////////////////////////////////////////////////////
//
// Uploader
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

const React = require('react/addons');
const DOM   = React.DOM;

//// FLUX /////////////////////////////////////////////////////////////////////

let { uploadFiles } = require('../actions/server');
let { filterFiles } = require('../actions/client');

//// COMPONENT ////////////////////////////////////////////////////////////////

let Uploader = React.createClass({

  getInitialState() {

    return { hover : false };

  },

  _onChangeFilter(e) {

    filterFiles(e.target.value);

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

    return DOM.form({
      action    : 'upload',
      method    : 'post',
      encType   : 'multipart/data',
      className : 'uploader'
    },

      // Drag and drop Zone
      DOM.fieldset(null,

        DOM.div({

          id          : 'file-drag',
          className   : className,
          onDragEnter : this._onDragEnter,
          onDragOver  : this._onDragOver,
          onDragLeave : this._onDragLeave,
          onDrop      : this._onDrop,
          style       : { 'display' : 'block' }

        },

          DOM.p(null, 'Drop files here')

        )
      ),

      // Content filter
      DOM.fieldset(null,
        DOM.input({
          id          : 'filter',
          type        : 'text',
          placeholder : 'filter',
          onChange    : this._onChangeFilter
        })
      )
    );

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
