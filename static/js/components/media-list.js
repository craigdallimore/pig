///////////////////////////////////////////////////////////////////////////////
//
// MediaList component
//
///////////////////////////////////////////////////////////////////////////////

//// LIBS /////////////////////////////////////////////////////////////////////

const { Flux }  = require('delorean');
const React     = require('react');
const DOM       = React.DOM;

//// COMPONENT ////////////////////////////////////////////////////////////////

let ListItem = require('./list-item');

let MediaList = React.createClass({

  mixins : [ Flux.mixins.storeListener ],

  render : function render() {

    let { types }      = this.getStore('fileStore');
    let { type, name } = this.props;
    let id             = this.props.key;
    let children       = types[type];

    return DOM.li({
      className : 'media-list',
      id        : id,
      key       : id
    },
      DOM.h2(null, name),
      DOM.ul(null, children.map(ListItem))
    );

  }

});

//// EXPORTS //////////////////////////////////////////////////////////////////

module.exports = React.createFactory(MediaList);

///////////////////////////////////////////////////////////////////////////////
